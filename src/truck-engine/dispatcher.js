// Truck Engine - Dispatcher Module:
(function() {
  "use strict";
  var DispatchStack = function(array) {
    var __array = [];
    if (array && Array.isArray(array)) {
      var i = -1;
      var len = array.length;
      while (++i < len) {
        __array[i] = array[i];
      }
    } else if (array) {
      var arr = Array.prototype.slice.apply(arguments);
      arr.forEach(function(ctx, idx) {
        __array[idx] = ctx;
      });
    }
    return {

      size: function() {
        return __array.length;
      },

      push: function(data) {
        __array.push(data);
      },

      pop: function() {
        return __array.pop();
      },

      eq: function(index) {
        if (index < 0) {
          return __array[__array.length + index];
        } else {
          return __array[index];
        }
      },

      forEach: function(callback) {
        var value;
        var i = -1;
        var len = __array.length;
        while (++i < len) {
          value = callback.call(__array[i], __array[i], i);
          if (value === false) {
            break;
          }
        }
      },

      shift: function() {
        return __array.shift.apply(__array, arguments);
      },

      unshift: function() {
        return __array.unshift.apply(__array, arguments);
      },

      splice: function() {
        return __array.splice.apply(__array, arguments);
      },

      indexOf: function() {
        return __array.indexOf.apply(__array, arguments);
      },

      purge: function() {
        __array = [];
      },

      getData: function() {
        return __array;
      }
    };
  };
  $.extend({
    handles: {},

    // Handle: string defining handle: /some/handle
    // Data: a string, number, array or object.
    receive: function(handle, callback) {
      if (!$.handles[handle]) {
        $.handles[handle] = DispatchStack(); // jshint ignore:line
      }
      var token = ($.uuid());
      $.handles[handle].push({
        token: token,
        callback: callback
      });
      return token;
    },

    dispatch: function(handle, args) {
      if (!$.handles[handle]) {
        return false;
      }
      setTimeout(function() {
        var len = $.handles[handle] ? $.handles[handle].size() : 0;
        while (len--) {
          $.handles[handle].eq(len).callback(handle, args);
        }
        return true;
      });
      return true;
    },

    cancelReceiver: function(token) {
      setTimeout(function() {
        for (var m in $.handles) {
          if ($.handles[m]) {
            for (var i = 0, len = $.handles[m].size(); i < len; i++) {
              if ($.handles[m].eq(i).token === token) {
                $.handles[m].splice(i, 1);
                return token;
              }
            }
          }
        }
        return false;
      });
    }
  });
})();