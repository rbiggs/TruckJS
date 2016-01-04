// Truck Engine - Mediator Module:
(function() {
  "use strict";
  $.extend({
    
    MediatorStack: function(array) {
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

        eq: function(index) {
          if (index < 0) {
            return __array[__array.length + index];
          } else {
            return __array[index];
          }
        },

        indexOf: function() {
          return __array.indexOf.apply(__array, arguments);
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

        setExecutable: function(token, exec) {
          __array.forEach(function(receiver) {
            if (receiver.token === token) {
              receiver.exec = exec;
              delete receiver.stopAfter;
            }
          });
        },

        setStopAfter: function(token, stopAfter) {
          __array.forEach(function(receiver) {
            if (receiver.token === token) {
              receiver.stopAfter = stopAfter;
            }
          });
        },

        splice: function() {
          return __array.splice.apply(__array, arguments);
        },

        getData: function() {
          return __array;
        }
      };
    },

    // Object to hold all the receivers defined.
    mediators: {},

    // Handle: string defining handle: /some/handle
    // Data: a string, number, array or object.
    Mediator: function(handle, callback) {
      if (!$.mediators[handle]) {
        $.mediators[handle] = $.MediatorStack(); // jshint ignore:line
      }
      var __exec = true;
      var __stopAfter;
      var __stopCount = false;
      var self = this;
      var token = ($.uuid());
      $.mediators[handle].push({
        token: token,
        callback: callback,
        exec: true
      });
      return {
        token: token,
        handle: handle,
        count: 0,
        exec: __exec,

        run: function(data) {
          if(!this.exec) return;
          if (__stopAfter && __stopAfter > 0) {
            callback.call(this, data);
            __stopAfter--;
            if(!this.stopCount) this.count++;
            $.mediators[handle].setStopAfter(token, __stopAfter);
            if (__stopAfter === 0) {
              this.exec = false;
              $.mediators[handle].setExecutable(token, false);
            }
          } else {
            if (callback) {
              callback.call(this, data);
              if (!this.stopCount) this.count++;
            }
          }
        },

        stop: function(stopAfter) {
          if (stopAfter) {
            __stopAfter = stopAfter;
            $.mediators[handle].setStopAfter(token, stopAfter);
          } else {
            this.exec = false;
            $.mediators[handle].setExecutable(token, false);
          } 
        },

        start: function() {
          __exec = true;
          $.mediators[handle].setExecutable(token, true);
        }
      };
    },

    receive: function(handle, callback) {
      return $.Mediator(handle, callback);
    },

    dispatch: function(handle, args) {
      if (!$.mediators[handle]) {
        return false;
      }
      setTimeout(function() {
        var len = $.mediators[handle] ? $.mediators[handle].size() : 0;
        while (len--) {
          if (!$.mediators[handle].eq(len).exec) return;
          var stopAfter = $.mediators[handle].eq(len).stopAfter;
          if (stopAfter > 0) {
            $.mediators[handle].eq(len).callback(args);
            stopAfter--;
            $.mediators[handle].setStopAfter($.mediators[handle].eq(len).token, stopAfter);
            if (stopAfter === 0) $.mediators[handle].eq(len).exec = false;
          } else if (stopAfter === 0) {
            return;
          } else if (stopAfter === undefined) {
            $.mediators[handle].eq(len).callback(args);
          }
        }
        return true;
      });
      return true;
    },

    startDispatch: function(mediator) {
      setTimeout(function() {
        for (var m in $.mediators) {
          if ($.mediators[m] && $.mediators[m].size()) {
            $.mediators[m].forEach(function(item, i) {
              if (item.token === mediator.token) {
                item.exec = true;
              }
            });
          }
        }
        return false;
      });
    },

    stopDispatch: function(mediator) {
      setTimeout(function() {
        for (var m in $.mediators) {
          if ($.mediators[m] && $.mediators[m].size()) {
            $.mediators[m].forEach(function(item, i) {
              if (item.token === mediator.token) {
                item.exec = false;
              }
            });
          }
        }
        return false;
      });
    }
  });
})();