(function($) {

  $('.btn-show-compare').click(function () {
    $('.table-responsive').slideDown('fast');
    $(this).hide();
    $('.btn-hide-compare').show();
  });

  $('.btn-hide-compare').click(function () {
    $('.table-responsive').slideUp('fast');
    $(this).hide();
    $('.btn-show-compare').show();
  })
  
})(jQuery);

