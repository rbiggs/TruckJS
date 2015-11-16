// Truck Engine - Screens Module:
(function() {
  "use strict";
  $(function() {
    //=================================
    // Interface for the app's screens:
    //=================================
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