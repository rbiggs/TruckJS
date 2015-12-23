// Truck Engine - Component Module:
(function() {
  "use strict";
  $.extend({
    Component: function(options) {
      $[options.name] = function() {
        this.options = options;
        delete this.options.name
        return $.View(this.options);
      };
    }
  });
})();