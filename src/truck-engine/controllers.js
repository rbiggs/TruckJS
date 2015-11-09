// Truk-Engine Controllers Module:
(function() {
  "use strict";
  $.extend({
    controllers: {},
    Controller : function(handle) {
      var __handle = handle;
      var __token = $.uuid();
      var __stopCount = false;
      var __exec = true;

      // Return closure to encapsulate methods:
      return {
        init: function(callback) {
          if (!callback) return;
          var subscribe = function (handle, cb) {
            if (!$.controllers[handle]) {
              $.controllers[handle] = $.Stack();
            }
            $.controllers[handle].push({
              token: __token,
              callback: cb,
              exec: true,
              count: 0,
              startFrom: 0,
              stopAfter: 0,
              time: 0,
            });
          }   
          subscribe(__handle, callback)   
        },

        run: function ( args ) {
          if (!$.controllers[__handle]) {
            return;
          }
          if (__exec === false) return
          setTimeout(function () {

            var len = $.controllers[__handle].size();

            for(var k = 0; k < len; k++) {

              var item = $.controllers[__handle].eq(k);
                if (item.stopAfter > 0) {

                  if (item.startFrom < item.stopAfter) {
                    item.count++;
                    item.startFrom++;
                    item.callback(args);
                  } else if (item.startFrom >= item.stopAfter) {
                    item.exec = false;
                    item.startFrom = 0;
                    item.stopAfter = 0;
                  }

                } else if (item.time) {
                  if (item.time && ( item.time < Date.now())) {
                    item.exec = true;
                    item.callback( args);
                    item.time = 0;
                    if(!__stopCount) item.count++;
                  }
                } else {

                  if (item.exec) {
                    item.count++;
                    item.callback(args);
                  }
                }
            }
          });
        },

        stop: function(after) {
          __exec = false;
          $.controllers[__handle].map(function(item) {
            if (item.token === __token) {
              if (!isNaN(after)) {
                item.stopAfter = after;
                item.startFrom = 0;
              } else {
                item.exec = false;
              }
            }
          });
        },

        restart: function(time) {
          __exec = true;
          $.controllers[__handle].map(function(item) {
            if (item.token === __token) {
              if (!isNaN(time)) {
                item.time += (Date.now() + (time * 1000));
                item.exec = false;
              } else {
                item.exec = true;
              }
            }
          });
        },

        getCount: function() {
          var temp;
          $.controllers[__handle].map(function(item) {
            if (item.token === __token) {
              temp = item.count;
            }
          });
          return temp
        },

        resetCount: function() {
          $.controllers[__handle].forEach(function(item) {
            item.count = 0;
          });
        },

        stopCount: function() {
          __stopCount = true;
        },

        kill: function(token) {
          __exec = false;
          setTimeout(function() {
            for (var m in $.controllers) {
              if ($.controllers[m]) {
                for (var i = 0, len = $.controllers[m].length; i < len; i++) {
                  if ($.controllers[m].eq(i).token === token) {
                    $.controllers[m].splice(i, 1);
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