// Truck Engine - Screens Module:
(function() {
  "use strict";
  $(function() {
    $.extend({
      screens: $('screen')
    });
    $.extend($.screens, {
      getCurrent: function() {
        return this.hazClass('current');
      },

      getNext: function() {
        return this.hazClass('next');
      },

      getPrevious: function() {
        return this.hazClass('previous');
      }
    });
  });
})();