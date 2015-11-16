// Truck Wheels - Events Module:
(function() {
  "use strict";
  //======================================
  // Define interface for handling events:
  //======================================
  if (typeof jQuery !== 'undefined') return;

  var TruckEventStack = function(array) {
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
        __array.unshift.apply(__array, arguments);
      },

      splice: function() {
        __array.splice.apply(__array, arguments);
      },

      indexOf: function() {
        return __array.indexOf.apply(__array, arguments);
      },

      getData: function() {
        return __array;
      },

      purge: function() {
        __array = [];
      },
    };
  };

  var TruckEventCache = {
    elements: {}
  };



  /* jshint, evil: false, validthis:true, unused:false, loopfunc: false,
  smarttabs: true, nonew: false */
  
  ////////////////////////////////////////////////////
  // Private method to set events on TruckEventCache
  ////////////////////////////////////////////////////
  var bind = function(element, event, callback, capturePhase) {
    if (!element.id) element.id = Truck.uuid();
    if (!TruckEventCache.elements[element.id]) {
      TruckEventCache.elements[element.id] = TruckEventStack(); // jshint ignore:line
    }
    TruckEventCache.elements[element.id].push({
      event: event,
      callback: callback
    });
    element.addEventListener(event, callback, capturePhase);
  };


  // Delete items from event stack:
  //===============================
  var deleteFromEventStack = function(toDelete, evtStck) {
    var len = toDelete.length;
    for (var i = 0; len > i; len--) {
      evtStck.splice(toDelete[len - 1], 1);
    }
  };
  ////////////////////////////////////////////////////
  // Private method to unbind events on TruckEventCache
  ////////////////////////////////////////////////////
  var unbind = function(element, event, callback, capturePhase) {

    var eventStack = TruckEventCache.elements[element.id];
    if (!eventStack) return;
    var deleteOrder = [];

    if (!event) {
      deleteOrder = [];
      eventStack.forEach(function(evt, idx) {
        element.removeEventListener(evt.event, evt.callback, evt.capturePhase);
        deleteOrder.push(idx);
      });

      deleteFromEventStack(deleteOrder, eventStack);

    } else if (!!event && !callback) {
      deleteOrder = [];
      eventStack.forEach(function(evt, idx) {
        if (evt.event === event) {
          element.removeEventListener(evt.event, evt.callback, evt.capturePhase);
          deleteOrder.push(idx);
        }
      });

      deleteFromEventStack(deleteOrder, eventStack);

    } else if (callback) {
      deleteOrder = [];
      eventStack.forEach(function(evt, idx) {
        if (callback === evt.callback) {
          element.removeEventListener(evt.event, evt.callback, evt.capturePhase);
          deleteOrder.push(idx);
        }
      });
      deleteFromEventStack(deleteOrder, eventStack);
    }
  };

  //////////////////////////////////////////////////////////////
  // Private method to set delegated events on TruckEventCache
  //////////////////////////////////////////////////////////////

  var delegate = function(element, selector, event, callback, capturePhase) {
    var delegateElement = $(element).array[0];
    $(element).forEach(function(ctx) {
      $(ctx).on(event, function(e) {
        var target = e.target;
        if (e.target.nodeType === 3) {
          target = e.target.parentNode;
        }
        $(ctx).find(selector).forEach(function(delegateElement) {
          if (delegateElement === target) {
            callback.call(delegateElement, e);
          } else {
            try {
              var ancestor = $(target).closest(selector);
              if (delegateElement === ancestor.array[0]) {
                callback.call(delegateElement, e);
              }
            } catch (err) {}
          }
        });
      }, capturePhase);
    });
  };


  ///////////////////////////////////////////////////////////////////
  // Private method to remove delegated events from TruckEventCache
  ///////////////////////////////////////////////////////////////////
  var undelegate = function(element, selector, event, callback, capturePhase) {

    unbind($(element).array[0], event, callback, capturePhase);
  };

  Truck.fn.extend({
    on: function(event, selector, callback, capturePhase) {

      if (!selector && /Object/img.test(event.constructor.toString())) {
        this.forEach(function(element) {
          for (var key in event) {
            if (event.hasOwnProperty(key)) {
              $(element).on(key, event[key]);
            }
          }
        });
      }
      var ret = [];
      var events;
      if (typeof event === 'string') {
        event = event.trim();
        if (/\s/.test(event)) {
          events = event.split(' ');
          this.forEach(function(ctx) {
            events.forEach(function(evt) {
              if (typeof selector === 'function') {
                bind(ctx, evt, selector, callback);
                ret.push(ctx);
              } else {
                delegate(ctx, selector, evt, callback, capturePhase);
                // ret.push(ctx);
              }
            });
          });
        }
      }
      this.forEach(function(ctx) {
        if (typeof selector === 'function') {
          return bind(ctx, event, selector, callback);
        } else {
          delegate(ctx, selector, event, callback, capturePhase);
          // ret.push(ctx);
        }
      });
      return this;
    },

    off: function(event, selector, callback, capturePhase) {
      var ret = new DOMStack();
      if (!this.size()) return ret;

      this.forEach(function(ctx) {
        if (typeof event === 'undefined') {
          ret.push(ctx);
          unbind(ctx);
          return ret;
        } else if (typeof selector === 'function' || !selector) {
          unbind(ctx, event, selector, callback, capturePhase);
          return this;
        } else {
          undelegate(ctx, selector, event, callback, capturePhase);
          return this;
        }
      });
    },

    trigger: function(event) {
      if (!this.size()) return new DOMStack();
      this.forEach(function(ctx) {
        if (document.createEvent) {
          var evtObj = document.createEvent('Events');
          evtObj.initEvent(event, true, false);
          ctx.dispatchEvent(evtObj);
        }
      });
    }
  });
})();