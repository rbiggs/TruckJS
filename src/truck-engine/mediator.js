// Truck-Engine - Mediators Module:
(function() {
  "use strict";
  $.extend({
    mediators: {},
    Mediator: function(handle) {
      var __handle = handle;
      var __token = $.uuid();
      var __stopCount = false;
      var __exec = true;
      var __restartTime = 0;

      // Return closure to encapsulate methods:
      return {
        init: function(callback) {
          if (!callback) return;
          var subscribe = function(handle, cb) {
            if (!$.mediators[handle]) {
              $.mediators[handle] = $.Stack();
            }
            $.mediators[handle].push({
              token: __token,
              callback: cb,
              exec: true,
              count: 0,
              startFrom: 0,
              stopAfter: 0,
              time: 0,
            });
          };
          subscribe(__handle, callback);
        },

        run: function(args) {
          if (!$.mediators[__handle]) {
            return;
          }
          if (__exec === false && !__restartTime) {
            return;
          } else {
            setTimeout(function() {
              var len = $.mediators[__handle].size();
              for (var k = 0; k < len; k++) {
                var item = $.mediators[__handle].eq(k);
                if (item.exec === false && !item.time) {
                  break;
                } else {
                  // Handle stop after designated number of times:
                  if (item.stopAfter > 0 && __exec && item.exec) {
                    if (item.startFrom < item.stopAfter) {
                      if (!__stopCount) item.count++;
                      item.startFrom++;
                      item.callback(args);
                      if (item.startFrom >= item.stopAfter) {
                        __exec = false;
                        item.exec = false;
                        item.startFrom = 0;
                        item.stopAfter = 0;
                      }
                      break;
                    } else if (item.startFrom >= item.stopAfter) {
                      item.exec = false;
                      __exec = false;
                      item.startFrom = 0;
                      item.stopAfter = 0;
                      break;
                    }

                    // Handle start after desinated time:
                  } else if (item.time && item.time > 0) {
                    if (item.time <= Date.now()) {
                      item.exec = true;
                      __exec = true;
                      item.callback(args);
                      if (!__stopCount) item.count++;
                      __restartTime = 0;
                      item.time = 0;
                    } else {
                      break;
                    }

                    // Otherwise just run it:
                  } else {
                    if (item.exec && __exec) {
                      if (!__stopCount) item.count++;
                      item.callback(args);
                    }
                  }
                }
              }
            });
          }
        },

        stop: function(after) {
          $.mediators[__handle].map(function(item) {
            if (item.token === __token) {
              if (!isNaN(after)) {
                item.stopAfter = after;
                item.startFrom = 0;
                __exec = true;
                item.exec = true;
              } else {
                item.exec = false;
                __exec = false;
              }
            }
          });
        },

        restart: function(time) {
          __exec = true;
          $.mediators[__handle].map(function(item) {
            if (item.token === __token) {
              if (!isNaN(time)) {
                item.time = (Date.now() + (time * 1000));
                __restartTime = item.time;
                item.exec = false;
                __exec = false;
              } else {
                item.exec = true;
                __exec = true;
              }
            }
          });
        },

        getCount: function() {
          var temp;
          $.mediators[__handle].map(function(item) {
            if (item.token === __token) {
              temp = item.count;
            }
          });
          return temp;
        },

        resetCount: function() {
          $.mediators[__handle].forEach(function(item) {
            item.count = 0;
          });
        },

        stopCount: function() {
          __stopCount = true;
        },

        kill: function(token) {
          __exec = false;
          setTimeout(function() {
            for (var m in $.mediators) {
              if ($.mediators[m]) {
                for (var i = 0, len = $.mediators[m].length; i < len; i++) {
                  if ($.mediators[m].eq(i).token === token) {
                    $.mediators[m].splice(i, 1);
                    return token;
                  }
                }
              }
            }
            return false;
          });
        },
      };
    }
  });
})();