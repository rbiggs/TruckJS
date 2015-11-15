// Truck Engine - Stack Module:
(function() {
  "use strict";
  $.extend({ 
    Stack: function(array) {
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

      // Return closure to encapsulate data:
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
          var i = 0;
          var len = __array.length;
          for (; i < len; i++) {
            value = callback.call(__array[i], __array[i], i);
            if (value === false) {
              break;
            }
          }
        },

        each: function(callback) {
          var value;
          var i = 0;
          var len = __array.length;
          for (; i < len; i++) {
            value = callback.call(__array[i], i, __array[i]);
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

        slice: function() {
          return __array.slice.apply(__array, arguments);
        },

        splice: function() {
          __array.splice.apply(__array, arguments);
        },

        sort: function() {
          __array.sort(arguments);
        },

        sortBy: function(args) {
          var __orderBy = function(args) {
            var props = arguments;
            return function(a, b) {
              var sortByProperty = function(property) {
                var sortOrder = 1;
                if (property[0] === "-") {
                  sortOrder = -1;
                  property = property.substr(1);
                }
                return function(a, b) {
                  var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                  return result * sortOrder;
                };
              };
              var i = 0;
              var result = 0;
              var numberOfProperties = props.length;
              while (result === 0 && i < numberOfProperties) {
                result = sortByProperty(props[i])(a, b);
                i++;
              }
              return result;
            };
          };
          __array.sort(__orderBy.apply(null, arguments));
        },
        
        filter: function() {
          return __array.filter.apply(__array, arguments);
        },

        map: function() {
          return __array.map.apply(__array, arguments);
        },

        join: function(separator) {
          return __array.join(separator);
        },

        concat: function(object) {
          if (Array.isArray(object)) {
            var i = -1;
            var len = object.length;
            while (++i < len) {
              __array[__array.length] = object[i];
            }
          }
        },

        reverse: function() {
          __array.reverse.apply(__array, arguments);
        },

        indexOf: function(el, idx) {
          var i = 0;
          var len = __array.length;
          var compareObjects = function(a, b) {
            if (a === b)
              return true;
            for (var i in a) {
              if (b.hasOwnProperty(i)) {
                if (a[i] !== b[i]) return false;
              } else {
                return false;
              }
            }

            for (var i in b) {
              if (!a.hasOwnProperty(i)) {
                return false;
              }
            }
            return true;
          };
          for(;i<len; i++) {
            if ($.type(el) === 'object') {
              if (compareObjects(el, __array[i])) {
                return i;
              }
            } else {
              if (el === __array[i]) {
                return i;
              }
            }
          }
        },

        every: function() {
          return __array.every.apply(__array, arguments);
        },

        some: function() {
          return __array.some.apply(__array, arguments);
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

        purge: function() {
          __array = [];
        },

        getData: function() {
          return __array;
        }
      };
    }
  });
})();