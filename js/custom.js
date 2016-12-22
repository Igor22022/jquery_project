var products = {};

/*--- Template builder for product items ---*/
var builder = (function() {
  var getProductTemplate = function(data) {
    return '<div class="item col-md-4 col-sm-6 col-xs-12" data-id="' +data.id+ '">' +
        '<img src="' +data.image+ '"/>' +
        '<p class="item_name">' +data.title+ '</p>' +
        '<p class="item_collection">' +data.description+ '</p>' +
        '<p class="item_price">$ ' +data.price+ "</p>" +
      "</div>"
  }
  return {
      buildProduct: getProductTemplate,
  }
})()
/*--- End of Template builder for product items ---*/



$(document).ready(function(){

  /*--- Request to JSON data_file ---*/
  $.get('products_data.json', function(data){
    products = data;
    //receive array with products
    var templates = $.map(products, function(product){
      return builder.buildProduct(product);
    });
    $(".section3 .row").html(templates);
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

  /*--- show/hide Modal Wrapper ---*/
  $('.section3').on('click', '.about_item',function(e){
    e.preventDefault();
    $('.modal_wrapper').show(600);

    // take item from array of products
    var item_id = $(this).parent().data('id');
    $.each(products, function(){
      if(this.id==item_id){
        // console.log(this.title);
        $.each(this, function(key, value){
          console.log(key +":"+value);
        });
      }
    });
  });
  $('.section3').on('click', '.close_icon', function(){
    $('.modal_wrapper').hide(600);
  });

});
