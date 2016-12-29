var cart = []; // array with products in cart to buy
var productToBuy;


// Обгортка для уникнення конфлікту імен
(function($) {

    var functions = {
        
        showProduct: function(element) {
        // take item from array of products

            var item_id = element.parent().data('id');
            var result = $.grep(products, function(e) {
                return e.id == item_id;
            });
            productToBuy = result[0];

            //filling in modal wrapper by product's info
            $(".modal_div img").attr("src",result[0].image);
            var model = $("#model").text();
            $("#model").text(model+result[0].title);

            var collection = $("#collection").text();
            $("#collection").text(collection+result[0].description);
            
            var price = $("#price").text();
            $("#price").text(price+result[0].price + " $");

            var manufacturer = $("#manufacturer").text();
            $("#manufacturer").text(manufacturer+result[0].manufacturer);

            var gender = $("#gender").text();
            $("#gender").text(result[0].gender + gender);

            for(i=0; i<(result[0].sizes).length; i++){
                $('#sizes').append("<option>"+ result[0].sizes[i] + "</option>");
            }
            for(i=0; i<(result[0].colors).length; i++){
                $('#colors').append('<li><label><input type="radio" name="selectedColor" value="'+ result[0].colors[i] +'" /> '+ result[0].colors[i] +'</label></li>');
            }
        },

        //  clear modal blocks after closing modal window 
        clearModal: function(){
            $(".modal_div img").attr("src",'');
            $("#model").text('model: ');
            $("#collection").text('collection: ');
            $("#price").text('price: ');
            $("#manufacturer").text('made by: ');
            $("#gender").text(' shoes');
            $('#sizes option').remove();
            $('#colors li').remove();
        },

        /*--- Filter products by chosen values ---*/

        filterProducts: function(element){
            //getting value of checked input
            var filterValue = element.val();

            if ( $( element ).is( ":checked" ) ){
                //(products is object with all products)
                if(element.attr('name')=="size"){
                    
                    var result = $.grep(products, function(e) {
                        if($.inArray(Number(filterValue), e.sizes) !== -1){
                            return true;
                        }
                    });
                    console.log(result);
                    

                } else if(element.attr('name')=="gender"){
                    var result = $.grep(products, function(e) {
                        return e.gender == filterValue;
                    });
                    console.log(result);
                } else{
                    return this;
                }
            } else{
                console.log("doesn't checked");
            }

            
        },
        /*--- End of Filter products function ---*/

        /*--- Show products in cart ---*/
        redrawCart: function(){
            var totalPrice = 0;
            var vat, sum = 0;
            var template = $.map(cart, function(product) {
                totalPrice += product.price;
                return builder.cartItem(product); 
            });
            vat = 0.2*totalPrice;
            sum = 0.8*totalPrice;
            //console.log(template);
            $("#section1_busket .rows").html(template);
            $('#section1_busket').show();
            $('#section1_busket').data('busket', 'isShown');
            $(window).scrollTop(0);
            $('.total_price').text(totalPrice);
            $('.vat').text(vat);
            $('.sum').text(sum);
        },
        /*--- End Show products in cart ---*/

        /*--- Delete item from cart ---*/
        // deleteItemFromCart = function(cartId){
        //     this.cartId = cartId;
        //     var result = $.grep(cart, function(item){
        //         item.id == this.cartId;
        //     });
        // },
        /*--- End fn : Delete item from cart ---*/
    };

    //добавляємо функцію в простір імен jquery
    $.fn.shoesMarketPlugin = function(functionName) {
        if (functions[functionName]) {
            return functions[functionName](this);
        } else {
            console.log("function dosn't exist");
            return this;
        }
    };

})(jQuery);

