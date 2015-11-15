// Truck Wheels - Data Cache Module:
(function() {
  "use strict";
  if (typeof jQuery !== 'undefined') return;

  var TruckDataStack = function(array) {
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

      filter: function(args) {
        return __array.filter.apply(__array, arguments);
      },

      map: function() {
        return __array.map.apply(__array, arguments);
      },

      indexOf: function() {
        return __array.indexOf.apply(__array, arguments);
      },

      unique: function() {
        var len = __array.length;
        var ret = [];
        var obj = {};

        for (i = 0; i < len; i++) {
          var arrayItem = JSON.stringify(__array[i]);
          var arrayItemValue = __array[i];
          if (obj[arrayItem] === undefined) {
            ret.push(arrayItemValue);
            obj[arrayItem] = 1;
          } else {
            obj[arrayItem]++;
          }
        }
        __array = ret;
      },

      getData: function() {
        return __array;
      },

      purge: function() {
        __array.length = 0;
      },
    };
  };
  var TruckDataCache = {
    elements: {}
  };
  $.fn.extend({
    data: function(key, value) {
      if (!this.size()) return new DOMStack();
      var val;
      var id;
      var ctx = this.array[0];
      if (!ctx.id) {
        ctx.id = $.uuid();
      }
      id = ctx.id;
      if (!TruckDataCache.elements[id]) {
        TruckDataCache.elements[id] = {};
      }
      if (key === 'undefined' || key === null) {
        return;
      }
      if (value || value === 0) {
        val = value;
        var obj = {};
        obj[key] = value;

        TruckDataCache.elements[id][key] = value;
      } else {
        if (!TruckDataCache.elements[id]) return;
        if (TruckDataCache.elements[id][key] === 0) {
          return TruckDataCache.elements[id][key];
        }
        if (!TruckDataCache.elements[id][key]) return;
        return TruckDataCache.elements[id][key];
      }
      return this;
    },

    removeData: function(key) {
      if (!this.size()) return this;
      this.forEach(function(element) {
        var id = element.id;
        if (!id) return this;
        if (!TruckDataCache.elements[id]) {
          return this;
        }
        if (!key) {
          delete TruckDataCache.elements[id];
          return this;
        }
        if (Object.keys(TruckDataCache.elements[id]).length === 0) {
          delete TruckDataCache.elements[id];
        } else {
          delete TruckDataCache.elements[id][key];
        }
        return this;
      });
    }
  });
})();