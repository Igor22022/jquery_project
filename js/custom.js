var products = {}; //object with products from data


var builder = (function() {

  /*--- Template builder for product items ---*/
  var getProductTemplate = function(data) {
    return '<div class="item col-md-4 col-sm-6 col-xs-12" data-id="' +data.id+ '">' +
        '<img src="' +data.image+ '"/>' +
        '<p class="item_name">' +data.title+ '</p>' +
        '<p class="item_collection">' +data.description+ '</p>' +
        '<p class="item_price">$ ' +data.price+ "</p>" +
      "</div>"
  };

  /*--- Template builder for filter block ---*/ 
  var getFilterTemplate = function(filterData, name) {
    return '<label><input type="checkbox" name="'+ name +'" value="' + filterData + '" /> '+ filterData +'</label><br />';
  };
  //filter block for sizes
  var getFilterSizesTemplate = function(filterData, name) {
    return '<label><input type="checkbox" name="'+ name +'" value="' + filterData + '" /> size'+ filterData +'</label><br />';
  };

  /*--- Template builder for cart item ---*/ 
  var getCartItemTemplate = function(data){
    return  '<div class="row">' +
            '<div class="buscket_item col-md-3 col-sm-3 col-xs-3">' +'<img src="' +data.image+ '"/>'+ '</div>' +
            '<div class="buscket_item col-md-3 col-sm-3 col-xs-3">' +data.title+ '</div>' +
            '<div class="buscket_item col-md-2 col-sm-2 col-xs-2">' +'size & color'+ '</div>' +
            '<div class="buscket_item col-md-2 col-sm-2 col-xs-2">' +data.price+ '</div>' +
            '<div class="buscket_item col-md-2 col-sm-2 col-xs-2"><a href="#" class="delete_item_button" data-cartId="'+ data.id +'">x</a></div>' +
            '</div>';
  };



  return {
      buildProduct: getProductTemplate,
      buildFilter: getFilterTemplate,
      buildFilterSizes: getFilterSizesTemplate,
      cartItem: getCartItemTemplate,
  }
})()


var sizes = []; //array with existing product's sizes
var gender = []; //gender array

/*--- merge two arrays and de-duplicate items ---*/
function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}
//sizes = arrayUnique(array1.concat(array2));
  
 
$(document).ready(function(){

  /*--- Request to JSON data_file ---*/
  $.get('products_data.json', function(data){
    products = data;
    //receive array with product's tamplates
    var templates = $.map(products, function(product){

      // receive array with all sizes
      sizes = arrayUnique(sizes.concat(product.sizes));
      sizes.sort();
      // receive gender array
      gender = arrayUnique(gender.concat(product.gender));

      // display products from data in section 3 
      return builder.buildProduct(product);
    });
    $(".section3 .row").html(templates);

    /*---  Buuilding filter Block ---*/
    // sizes filter block

    var filterTemplates = $.map(sizes, function(size){
      return builder.buildFilterSizes(size, 'size');
    });
    $(".section3 .filter_sizes").html(filterTemplates);

    // gender filter block
    var filterTemplates = $.map(gender, function(sex){
      return builder.buildFilter(sex, 'gender');
    });
    $(".section3 .filter_gender").html(filterTemplates);

    //adding butttons in item block
    $('.section3 .item').append("<a href='#' class='buy_button'>Buy Now</a>");
    $('.section3 .item').append("<a href='#' class='about_item'>Details</a>");
  }, 'json');


  /*--- add Buy Button and Details Button to Product placeholder---*/
  $('.section3').on('mouseover','.item',function(){
    $(this).find(".buy_button").show(0);
    $(this).find(".about_item").show(0);
    
  })
  
  $('.section3').on('mouseout', '.item', function(){
    $(this).find(".buy_button").hide(0);
    $(this).find(".about_item").hide(0);
  })

  /*--- show/hide busket info ---*/
  $('.busket_info_button').on('click', function(){
    if($('#section1_busket').data('busket') == "isShown"){
      $('#section1_busket').hide();
      $('#section1_busket').data('busket', 'isHidden');
    } else {
      $('#section1_busket').show();
      $('#section1_busket').data('busket', 'isShown');
    }
  });
  $('.section1 .container').on('click', function(){
    if($('#section1_busket').data('busket') == "isShown"){
      $('#section1_busket').hide();
      $('#section1_busket').data('busket', 'isHidden');
    }
  });

  /*--- add product to cart ---*/
  $('.section3').on('click', '#addToCart',function(e){
    e.preventDefault();
    cart.push(productToBuy);
    
    $(this).shoesMarketPlugin('redrawCart');

  });

  /*--- show/hide Modal Wrapper ---*/
  $('.section3').on('click', '.about_item',function(e){
    e.preventDefault();
    $('.modal_wrapper').show(600);

    // show item in modal wrapper
    $(this).shoesMarketPlugin('showProduct');
  });

  $('.section3').on('click', '.close_icon, #overlay, #addToCart', function(){
    $('.modal_wrapper').hide(600);
    // clear modal window
    $(this).shoesMarketPlugin('clearModal');
  });

  
  /*--- Filter Products ---*/
  $('.section3').on('click', 'input[type=checkbox]', function(){
    //console.log(this) ;
    $(this).shoesMarketPlugin('filterProducts');
  });
  /*--- End Of function of Filter Products ---*/

});
