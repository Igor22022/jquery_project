var products = {};
$(document).ready(function(){

  $.get('products_data.json', function(data){
    products = data;
  }, 'json');

  var builder = function() {
    var getProductTemplate = function(data) {
      return '<div class="item col-md-4 col-sm-6 col-xs-12" data-id=' +data.id+ >' +"'"
          <img src="../images/section_3_shoes/shoes_1.png" />
          <p class="item_name">KYRIE 2 </p>
          <p class="item_collection">Men’s Basketball Shoes</p>
          <p class="item_price">$140</p>
        </div>
    }

    return {
        buildProduct: getProductTemplate;
    }
  }

  /*--- add Buy Button and Details Button to Product placeholder---*/
  $('.section3 .item').append("<a href='#' class='buy_button'>Buy Now</a>");
  $('.section3 .item').append("<a href='#' class='about_item'>Details</a>");
  $('.section3 .item').mouseover(function(){
    $(this).find(".buy_button").show(0);
    $(this).find(".about_item").show(0);
  });
  $('.section3 .item').mouseout(function(){
    $(this).find(".buy_button").hide(0);
    $(this).find(".about_item").hide(0);
  });

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
  $('.about_item').on('click', function(e){
    e.preventDefault();
    $('.modal_wrapper').show(600);
  });
  $('.close_icon').on('click', function(){
    $('.modal_wrapper').hide(600);
  });

});
