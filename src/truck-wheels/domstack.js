// Truck Wheeles - DOM Stack Module:
(function(self) {
  "use strict";
  //=====================================
  // Define DOMStack for selector engine:
  //=====================================
  var DOMStack = (function() {
    function DOMStack(args) {
      this.array = [];
      this.length = 0;
      if (Array.isArray(args)) {
        var i = -1;
        var len = args.length;
        while (++i < len) {
          this.array[i] = args[i];
        }
      } else if (args) {
        if (args === document) {
          this.array[0] = document;
        } else {
          var array = Array.prototype.slice.apply(arguments);
          array.forEach(function(ctx, idx) {
            this.array[idx] = ctx;
          });
        }
      }
    }

    DOMStack.prototype.eq = function(index) {
      var ret = new DOMStack();
      if (!this.size()) return ret;
      var temp;
      if (index < 0) {
        temp = this.array[this.array.length + index];
        ret.push(temp);
      } else {
        temp = this.array[index];
        ret.push(temp);
      }
      ret[0] = ret.array[0];
      ret.length = ret.array.length;
      return ret;
    };

    DOMStack.prototype.push = function(data) {
      this.array.push(data);
      this.length = this.array.length;
      this[0] = this.array[0];
    };

    DOMStack.prototype.pop = function() {
      this.length = this.array.length - 1;
      return this.array.pop();
    };

    DOMStack.prototype.unshift = function(data) {
      this.array.unshift(data);
      this[0] = this.array[0];
      this.length = this.array.length;
    };

    DOMStack.prototype.shift = function() {
      this.length = this.array.length - 1;
      return this.array.shift();
    };

    DOMStack.prototype.size = function() {
      return this.array.length;
    };

    DOMStack.prototype.forEach = function(callback) {
      var value;
      var i = 0;
      var len = this.array.length;
      for (; i < len; i++) {
        value = callback.call(this.array[i], this.array[i], i);
        if (value === false) {
          break;
        }
      }
    };

    DOMStack.prototype.each = function(callback) {
      var value;
      var i = 0;
      var len = this.array.length;
      for (; i < len; i++) {
        value = callback.call(this.array[i], i, this.array[i]);
        if (value === false) {
          break;
        }
      }
    };

    DOMStack.prototype.slice = function() {
      var ret = new DOMStack();
      ret.concat(this.array.slice.apply(this.array, arguments));
      ret.length = ret.array.length;
      return ret;
    };

    DOMStack.prototype.splice = function() {
      this.array.splice.apply(this.array, arguments);
      this[0] = this.array[0];
      return this;
    };

    DOMStack.prototype.sort = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
      }
      this.array.sort.apply(this.array, arguments);
      this[0] = this.array[0];
    };

    DOMStack.prototype.sortBy = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
      }
      var orderBy = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i - 0] = arguments[_i];
        }
        var props = args;
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
      this.array.sort(orderBy.apply(null, args));
      this[0] = this.array[0];
      return this;
    };

    DOMStack.prototype.filter = function() {
      var ret = new DOMStack();
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
      }

      ret.concat(this.array.filter.apply(this.array, args));
      ret[0] = ret.array[0];
      return ret;
    };

    DOMStack.prototype.map = function() {
      var ret = new DOMStack();
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
      }
      ret.concat(this.array.map.apply(this.array, args));
      ret[0] = ret.array[0];
      return ret;
    };

    DOMStack.prototype.concat = function(collection) {
      var i = -1;
      var len;
      var temp;
      if (Array.isArray(collection)) {
        temp = collection;
        len = temp.length;
      } else if (collection.constructor.toString().match(/DOMStack/)) {
        temp = collection.getData();
        len = temp.length;
      } else if (collection.constructor.toString().match(/HTMLBodyElementConstructor/)) {
        temp = [collection];
        len = 1;
      }
      while (++i < len) {
        this.array[this.array.length] = temp[i];
      }
      this[0] = this.array[0];
      this.length = this.array.length;
    };

    DOMStack.prototype.reverse = function() {
      this.array.reverse.apply(this.array, arguments);
      this[0] = this.array[0];
    };

    DOMStack.prototype.indexOf = function() {
      return this.array.indexOf.apply(this.array, arguments);
    };

    DOMStack.prototype.every = function() {
      return this.array.every.apply(this.array, arguments);
    };

    DOMStack.prototype.some = function() {
      return this.array.some.apply(this.array, arguments);
    };

    DOMStack.prototype.unique = function() {
      var len = this.array.length;
      var ret = [];
      var obj = {};
      for (var i = 0; i < len; i++) {
        var arrayItem = JSON.stringify(this.array[i]);
        var arrayItemValue = this.array[i];
        if (obj[arrayItem] === undefined) {
          ret.push(arrayItemValue);
          obj[arrayItem] = 1;
        } else {
          obj[arrayItem]++;
        }
      }
      this.array = ret;
      this[0] = this.array[0];
      this.length = this.array.length;
    };

    DOMStack.prototype.getData = function() {
      return this.array;
    };

    DOMStack.prototype.type = function() {
      return 'domstack';
    };

    DOMStack.prototype.purge = function() {
      this.array.length = 0;
      this.length = 0;
    };
    return DOMStack;
  })();
  self.DOMStack = DOMStack;
})(window);