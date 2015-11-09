// Truck Wheels - Selector Module:
(function() {
  "use strict";
  if (typeof jQuery !== 'undefined') return;
  var temp;

  function Truck(selector, context) {
    var __this = this;
    var idRE = /^#([\w-]*)$/;
    var classRE = /^\.([\w-])$/;
    var tagRE = /^[\w-]+$/;
    var readyRE = /complete|loaded|interactive/;

    var slice = function(elements) {
      temp = new DOMStack([].slice.apply(elements));
      temp[0] = temp.array[0];
      return temp;
    };

    var getId = function(selector) {
      var el = document.getElementById(selector.split('#')[1]);
      if (el) {
        temp = new DOMStack([el]);
        temp[0] = new DOMStack([el]).array[0];
        temp.length = 1;
        return temp;
      } else {
        return new DOMStack();
      }
    };

    var getTag = function(selector, context) {
      if (context) {
        temp = slice(context.getElementsByTagName(selector));
        temp[0] = temp.array[0];
        temp.length = temp.length;
        return temp;
      } else {
        temp = slice(document.getElementsByTagName(selector));
        temp[0] = temp.array[0];
        temp.length = temp.array.length;
        return temp;
      }
    };

    var getClass = function(selector, context) {
      if (context) {
        temp = slice(context.getElementsByClassName(selector.split('.')[1]));
        temp[0] = temp.array[0];
        temp.length = temp.length;
        return temp;
      } else {
        temp = slice(document.getElementsByClassName(selector.split('.')[1]));
        temp[0] = temp.array[0];
        temp.length = temp.array.length;
        return temp;
      }
    };

    var getNode = function(selector, context) {
      if (typeof selector === 'string')
        selector = selector.trim();
      if (typeof selector === 'string' && idRE.test(selector)) {
        return getId(selector);
      }

      if (selector && (selector instanceof Array) && selector.length)
        return selector;
      if (!context && typeof selector === 'string') {
        if (/<\/?[^>]+>/.test(selector)) {
          return __this.make(selector);
        }

        if (tagRE.test(selector)) {
          return getTag(selector);

        } else if (classRE.test(selector)) {
          return getClass(selector);

        } else {
          temp = slice(document.querySelectorAll(selector));
          temp[0] = temp.array[0];
          temp.length = temp.array.length;
          return temp;
        }

      } else {
        if (context) {
          temp = slice($(context).find(selector));
          temp[0] = temp.array[0];
          temp.length = temp.array / length;
          return temp;

        } else {
          temp = slice(document.querySelectorAll(selector));
          temp[0] = temp.array[0];
          temp.length = temp.array.length;
          return temp;
        }
      }
    };

    if (selector && selector.constructor.toString().match(/DOMStack/)) {
      return selector;
    }

    if (selector === document) {
      return [document];
    }

    if (selector === null) {
      return new DOMStack();
    }

    if (!!context) {
      if (typeof context === 'string') {
        temp = slice(document.querySelectorAll(context + ' ' + selector));
        temp[0] = temp.array[0];
        temp.length = temp.array.length;
        return temp;
      } else if (context.nodeType === 1) {
        return getNode(selector, context);
      }

    } else if (typeof selector === 'function') {
      if (readyRE.test(document.readyState) && document.body) {
        selector.call(selector);
      } else {
        document.addEventListener("DOMContentLoaded", function() {
          return selector.call(selector);
        });
      }

    } else if (selector && selector.nodeType === 1) {
      temp = new DOMStack();
      temp[0] = selector;
      temp.length = temp.array.length;
      temp.push(selector);
      return temp;

    } else if (typeof selector === 'string') {
      if (selector === '') return new DOMStack();
      if (/<\/?[^>]+>/.test(selector)) {
        return Truck.make(selector);
      } else {
        try {
          return getNode(selector) ? getNode(selector) : new DOMStack();
        } catch (err) {
          return new DOMStack();
        }
      }

    } else if (selector instanceof Array) {
      var node;
      selector.every(function(ctx) {
        if (!ctx.nodeType) {
          node = "false";
        }
      });
      return (node === 'false') ? [] : selector;

    } else if (selector === window) {
      temp = new DOMStack();
      temp[0] = window;
      temp.length = temp.array.length;
      return temp;

    } else {
      return new DOMStack();
    }

    return new DOMStack();
  }
  (function(Truck) {
    Truck.extend = function(obj, prop, enumerable) {
      enumerable = enumerable || false;
      if (!prop) {
        prop = obj;
        obj = Truck;
      }
      Object.keys(prop).forEach(function(p) {
        if (prop.hasOwnProperty(p)) {
          Object.defineProperty(obj, p, {
            value: prop[p],
            writable: true,
            enumerable: enumerable,
            configurable: true
          });
        }
      });
      return Truck;
    };
    Truck.fn = {
      extend: function(object) {
        return Truck.extend(DOMStack.prototype, object);
      }
    };
  })(Truck);
  window.Truck = Truck;
  if (typeof jQuery === 'undefined') {
    window.$ = Truck;
  }
})();