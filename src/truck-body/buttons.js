// Truck Body - Button functions:
(function() {
  var truckBackButtonSVG = '<svg id="truck-back-button-svg" width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="truck-back-arrow" stroke="#979797"><path d="M50.7822487,4.05872022 L5.60302012,49.1913445 L50.4625593,94.6779982" id="back-arrow-bracket"></path><path d="M6,49.368351 L95.8300018,49.368351" id="back-arrow-shaft"></path></g></g></svg>';

  $.fn.extend({
    decorateBackButton: function() {
      if ($(this).hasClass('back') || $(this).hasClass('backTo')) {
        this.forEach(function(button) {
          var temp = $(button).text();
          $(button).html('<span>' + temp + '</span>');
          $(button).prepend(truckBackButtonSVG);
        });
      }
    }
  });
  $(function() {
    $('.back').decorateBackButton();
    $('.backTo').decorateBackButton();
  });
})();