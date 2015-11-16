// Truck Body - Screen Blocker:
(function() {
  "use strict";
  $.extend({

    //==============
    // Cover screen:
    //==============
    Block: function(opacity) {
      opacity = opacity ? " style='opacity:" + opacity + "'" : " style='opacity: .5;'";
      if ($('.mask')[0]) return;
      $('body').append("<div class='mask'" + opacity + "></div>");
      $('screen.current').attr('aria-hidden', true);
    },

    //================
    // Uncover screen:
    //================
    Unblock: function() {
      $('.mask').remove();
      $('screen.current').removeAttr('aria-hidden');
    }
  });
})();