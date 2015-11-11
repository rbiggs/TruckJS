/*
  Truck Wheels.
  This is a light and nimble DOM library providing jQuery-compatibility in a small footprint. If jQuery is loaded first, these do not get executed. Truck Engine and Body will use jQuery instead.
*/
/*jshint quotmark:false */
/*jshint nonew:false */
/*jshint notypeof:false */
/*jshint noempty:false */
/*jshint curly:false */
/*jshint shadow:false */
/*jshint singleGroups:false */
/*jshint undef:false */
/*jshint varstmt:false */
/*jshint boss:false */
/*jshint evil:false */
/*jshint expr:false */
/*jshint laxbreak:false */
/*jshint loopfunc:false */
/*jshint multistr:false */
/*jshint newcap:false */
/*jshint plusplus:false */
/*jshint supernew:false */
/*jshint sup:false */
/*jshint validthis:false */
/*jshint trailing:false */
/*jshint white:false */
// Truck Wheeles - DOM Stack Module:
(function(self) {
  "use strict";
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
        var array = Array.prototype.slice.apply(arguments);
        array.forEach(function(ctx, idx) {
          this.array[idx] = ctx;
        });
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
      this.array = [];
      this.array[0] = undefined;
      this.length = 0;
    };
    return DOMStack;
  })();
  self.DOMStack = DOMStack;
})(window);
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
// Truck Wheels - Utilities Module:
(function() {
  "use strict";
  if (typeof jQuery !== 'undefined') return;
  var slice = function(elements) {
    return [].slice.apply(elements);
  };
  $.extend({
    lib: "TruckJS",

    version: '0.0.1',

    noop: function() {},

    uuid: function() {
      var d = Date.now();
      var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
      var randomLetter = charset[Math.floor(Math.random() * charset.length)];
      return randomLetter + 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    },

    make: function(HTMLString) {
      var ret = new DOMStack();
      var temp;

      var wrapperMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        __default: [1, "<div>", "</div>"]
      };

      wrapperMap.optgroup = wrapperMap.option;
      wrapperMap.tbody = wrapperMap.tfoot = wrapperMap.colgroup = wrapperMap.caption = wrapperMap.thead;
      wrapperMap.th = wrapperMap.td;

      var element = document.createElement('div');
      var match = /<\s*\w.*?>/g.exec(HTMLString);

      if (match !== null) {
        var tag = match[0].replace(/</g, '').replace(/>/g, '');
        var map = wrapperMap[tag] || wrapperMap.__default;
        HTMLString = map[1] + HTMLString + map[2];

        element.innerHTML = HTMLString;
        element = element.lastChild;

        temp = [].slice.apply(element.childNodes);
        temp.forEach(function(ctx) {
          if (ctx.nodeType === 1) {
            ret.push(ctx);
          } else if (ctx.nodeType === 3 && ctx.nodeValue.trim().length !== 0) {
            ret.push(ctx);
          }
        });

      } else {
        element.innerHTML = HTMLString;
        element = element.lastChild;
        ret.push(element);
      }

      return ret;
    },

    html: function(HTMLString) {
      return $.make(HTMLString);
    },

    require: function(src, callback) {
      callback = callback || $.noop;
      var script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', src);
      script.setAttribute('defer', 'defer');
      script.onload = function() {
        callback.apply(callback, arguments);
      };
      document.getElementsByTagName('head')[0].appendChild(script);
    },

    delay: function(func, milliseconds) {
      if (milliseconds === void 0) {
        milliseconds = 1;
      }
      func = func || $.noop;
      setTimeout(function() {
        func.call(func);
      }, milliseconds);
    },

    defer: function(func) {
      func = func || $.noop;
      return $.delay.apply($, [func, 1].concat([].slice.call(arguments, 1)));
    },

    each: function(obj, callback) {
      var value;
      var key;
      var i = 0;
      var length;

      if (Array.isArray(obj)) {
        length = obj.length;
        for (; i < length; i++) {
          value = callback.call(obj[i], i, obj[i]);
          if (value === false) {
            break;
          }
        }
        return obj;
      } else if (obj.constructor.toString().match(/DOMStack/)) {
        obj.forEach(function(item, idx) {
          callback.call(item, idx, item);
        });
        return obj;
      } else if ($.type(obj) === 'object' && Object.keys(obj).length) {
        for (key in obj) {
          if (callback.call(obj[key], key, obj[key]) === false) return obj;
        }
      }
    }
  });
})();
// Truck Wheels - Types Module:
(function() {
  "use strict";
  if (typeof jQuery !== 'undefined') return;
  $.extend({
    type: function(type) {
      switch (typeof type) {
        case 'boolean':
          return 'boolean';
        case 'number':
          return 'number';
        case 'string':
          return 'string';
        case 'function':
          return 'function';
        case 'object':
          if (Array.isArray(type)) {
            return 'array';
          } else if (Object.prototype.toString.call(type) === '[object Date]') {
            return 'date';
          } else if (Object.prototype.toString.call(type) === '[object Error]') {
            return 'error';
          } else if (Object.prototype.toString.call(type) === '[object RegExp]') {
            return 'regexp';
          } else if (Object.prototype.toString.call(type) === '[object Object]') {
            return 'object';
          }
      }
    }
  });
})();
// Truck Wheels - String Module:
(function() {
  "use strict";
  if (typeof jQuery !== 'undefined') return;
  $.extend({
    camelize: function(string) {
      if (typeof string !== 'string')
        return;
      return string.replace(/\-(.)/g, function(match, letter) {
        return letter.toUpperCase();
      });
    },

    deCamelize: function(string) {
      if (typeof string !== 'string')
        return;
      return string.replace(/([A-Z])/g, '-$1').toLowerCase();
    },

    capitalize: function(string, all) {
      var $this = this;
      if (!string) {
        return;
      }
      if (typeof string !== 'string')
        return;
      if (all) {
        var str = string.split(' ');
        var newstr = [];
        str.forEach(function(item) {
          return newstr.push($this.capitalize(item));
        });
        return newstr.join(' ');
      } else {
        return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
      }
    },

    w: function(str) {
      return str.split(' ');
    }
  });
})();
// Truck Wheels - DOM Methods Module:
(function() {
  "use strict";
  if (typeof jQuery !== 'undefined') return;
  var slice = function(elements) {
    return new DOMStack([].slice.apply(elements));
  };
  $.fn.extend({
    find: function(selector, context) {
      var ret = new DOMStack();
      if (!this.size())
        return ret;
      if (context) {
        $(context).forEach(function() {
          slice(context.querySelectorAll(selector)).forEach(function(node) {
            return ret.push(node);
          });
        });
      } else {
        this.forEach(function(ctx) {
          if (ctx && ctx.children && ctx.children.length) {
            slice(ctx.querySelectorAll(selector)).forEach(function(node) {
              return ret.push(node);
            });
          }
        });
      }
      return ret;
    },

    is: function(arg) {
      var ret = false;
      if (!this.size() || !arg) return;
      if (!this.size())
        return;
      var __is = function(node, arg) {
        if (typeof arg === 'string') {
          var elements = Array.prototype.slice.apply(node.parentNode.querySelectorAll(arg));
          if (elements.length) {
            if (elements.indexOf(node) >= 0) {
              ret = true;
            }
          }
        } else if (typeof arg === 'function') {
          if (arg.call(this)) {
            ret = true;
          }
        } else if (arg && arg.length) {
          if (this.slice.apply(arg).indexOf(node) !== -1) {
            ret = true;
          }
        } else if (arg.nodeType === 1) {
          if (node === arg) {
            ret = true;
          }
        } else {
          return;
        }
        return ret;
      };
      this.forEach(function(item) {
        if (__is(item, arg)) {
          ret = true;
        }
      });
      return ret;
    },

    not: function(selector) {
      if (!this.size() || !selector) return new DOMStack();
      var ret = new DOMStack();
      var temp = [];
      var elems;
      if (typeof selector === 'string') {
        elems = Array.prototype.slice.apply(this.array[0].parentNode.querySelectorAll(selector));
        this.forEach(function(element) {
          elems.forEach(function(item) {
            if (element !== item) {
              ret.push(element);
            }
          });
        });
        return ret;
      } else if (selector && selector.constructor.toString().match(/DOMStack/)) {
        this.forEach(function(element) {
          selector.forEach(function(node) {
            if (node !== element) {
              temp.push(element);
            }
          });
        });
        if (temp.length) {
          ret.concat(temp);
        }
        return ret;
      } else if (selector && selector.nodeType === 1) {
        this.forEach(function(element) {
          if (element !== selector) {
            temp.push(element);
          }
        });
        if (temp.length) {
          ret.concat(temp);
        }
        return ret;
      }
    },

    has: function(arg) {
      if (!this.size()) return new DOMStack();
      var items = new DOMStack();

      var __has = function(node, arg) {
        if (typeof arg === 'string') {
          if (node.querySelector(arg)) {
            return true;
          }
        } else if (arg.nodeType === 1) {
          if (slice(this.children).data.indexOf(arg)) {
            return true;
          }
        } else {
          return false;
        }
      };

      this.forEach(function(element) {
        if (__has(element, arg)) {
          items.push(element);
        }
      });
      return items;
    },

    prev: function(selector) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      var children;
      var prevElement = this[0].previousElementSibling;
      if (selector && typeof selector === 'string') {
        children = this.siblings(selector);
        children.forEach(function(element) {
          if (prevElement === element) ret.push(element);
        });
      } else {
        ret.push(this[0].previousElementSibling);
      }
      return ret;
    },

    prevAll: function(selector) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      var _siblings;
      var _self = this[0];
      var _sibs = Array.prototype.slice.apply(this[0].parentNode.children);
      var pos = _sibs.indexOf(_self);
      _sibs.splice(pos, _sibs.length - 1);
      if (selector && typeof selector === 'string') {
        _siblings = this.siblings(selector).array;
        _sibs.forEach(function(element) {
          if (_siblings.indexOf(element) > -1) {
            ret.push(element);
          }
        });
      } else {
        _siblings = Array.prototype.slice.apply(this[0].parentNode.children);
        pos = _siblings.indexOf(_self);
        _siblings.splice(pos, _siblings.length - 1);
        ret.concat(_siblings);
      }
      return ret;
    },

    next: function(selector) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      var children;
      var nextElement = this[0].nextElementSibling;
      if (selector && typeof selector === 'string') {
        children = this.siblings(selector);
        children.forEach(function(element) {
          if (nextElement === element) ret.push(element);
        });
      } else {
        ret.push(this[0].nextElementSibling);
      }
      return ret;
    },

    nextAll: function(selector) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      var _siblings;
      var _parent;
      var _self = this[0];
      var _sibs = Array.prototype.slice.apply(this[0].parentNode.children);
      var pos = _sibs.indexOf(_self);
      _sibs.splice(0, pos + 1);
      if (selector && typeof selector === 'string') {
        _parent = this.array[0].parentNode;
        _siblings = $(_parent).find(selector);
        _sibs.splice(0, _sibs.indexOf(this.array[0]));
        _sibs.forEach(function(element) {
          if (_siblings.array.indexOf(element) > -1) {
            ret.push(element);
          }
        });
      } else {
        _siblings = Array.prototype.slice.apply(this[0].parentNode.children);
        pos = _siblings.indexOf(_self);
        _siblings.splice(0, pos + 1);
        ret.concat(_siblings);
      }
      return ret;
    },

    first: function() {
      if (!this.size()) return new DOMStack();
      return this.eq(0);

    },

    last: function() {
      if (!this.size()) return new DOMStack();
      return this.eq(-1);
    },

    index: function(element) {
      if (!this.size()) return undefined;
      if (!element) {
        return [].slice.apply(this[0].parentNode.children).indexOf(this[0]);
      } else {
        if (element && element.constructor.toString().match(/DOMStack/)) {
          return this.indexOf(element.getData()[0]);
        } else if (element.nodeType === 1) {
          return this.indexOf(element);
        } else {
          return this.indexOf(element);
        }
      }
    },

    children: function(selector) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      if (!selector) {
        this.forEach(function(node) {
          slice(node.children).forEach(function(ctx) {
            return ret.push(ctx);
          });
        });
        ret[0] = ret.array[0];
      } else {
        this.forEach(function(node) {
          slice(node.children).forEach(function(ctx) {
            if ($(ctx).is(selector)) {
              ret.push(ctx);
            }
          });
        });
        ret[0] = ret.array[0];
      }
      return ret;
    },

    siblings: function(selector) {
      if (!this.size())
        return new DOMStack();
      var _siblings;
      var ret = new DOMStack();
      var $this = this;
      var parent;
      var children = Array.prototype.slice.apply(this.array[0].parentNode.children);

      // Remove this from siblings;
      var pos = children.indexOf($this[0]);
      children.splice(pos, 1);

      children.splice(children.indexOf(this.array[0]), 0);
      if (selector && typeof selector === 'string') {
        parent = this.array[0].parentNode;
        _siblings = $(parent).find(selector);
        _siblings.array.splice(_siblings.array.indexOf(this.array[0]), 0);
        ret.concat(_siblings.array);
      } else {
        ret.concat(children);
      }
      return ret;
    },

    parent: function() {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      this.forEach(function(ctx) {
        return ret.push(ctx.parentNode);
      });
      ret.unique();
      return ret;
    },

    closest: function(selector) {
      if (!this.size())
        return new DOMStack();
      var ret = new DOMStack();
      if (typeof selector === 'undefined') {
        return new DOMStack();
      }
      var position = null;
      var p = this[0].parentNode;
      if (!p) {
        return new DOMStack();
      }
      if (typeof selector === 'string') {
        selector.trim();
      }
      if (typeof selector === 'number') {
        position = selector || 1;
        for (var i = 1; i < position; i++) {
          if (p && p.nodeName === 'HTML') {
            return p;
          } else {
            if (p !== null) {
              p = p.parentNode;
            }
          }
        }
        ret.push(p);
      } else if (typeof selector === 'string') {
        if (p && $(p).is(selector)) {
          ret.push(p);
        } else {
          ret.push($(p).closest(selector).array[0]);
        }
      }
      return ret;
    },

    css: function(property, value) {
      if (!this.size()) return new DOMStack();
      var pixelRE = /top|bottom|left|right|margin|padding/img;
      var postFix = '';
      var ret = new DOMStack();
      var testForPixelSupport = function(value, property) {
        if ($.type(value) === 'number' && property.match(pixelRE)) {
          postFix = 'px';
        }
      };
      if (!property) return new DOMStack();
      if (!value && $.type(property) === 'object') {
        this.forEach(function(node) {
          for (var key in property) {
            if (property.hasOwnProperty(key)) {
              testForPixelSupport(property[key], key);
              node.style[$.camelize(key)] = property[key] + postFix;
            }
          }
          ret.push(node);
        });
      } else if (!value && typeof property === 'string') {
        if (!this.size())
          return;
        return document.defaultView.getComputedStyle(this.eq(0).array[0], null).getPropertyValue(property.toLowerCase());
      } else if (!!value) {
        this.forEach(function(node) {
          testForPixelSupport(value, property);
          node.style[$.camelize(property)] = value + postFix;
          ret.push(node);
        });
      }
      return ret;
    },

    width: function() {
      if (!this.size())
        return;
      return this.eq(0).array[0].clientWidth;
    },

    height: function() {
      if (!this.size())
        return;
      return this.eq(0).array[0].clientHeight;
    },

    before: function(content) {
      if (!this.size()) {
        return new DOMStack();
      }
      var __before = function(node, content) {
        if (typeof content === 'string') {
          content = $.make(content);
        }
        if (content && content.constructor.toString().match(/DOMStack/)) {
          var len = content.size();
          var i = 0;
          while (i < len) {
            node.parentNode.insertBefore(content.array[i], node);
            i++;
          }
        } else if (content && content.nodeType === 1) {
          node.parentNode.insertBefore(content, node);
        }
        return this;
      };
      this.forEach(function(node) {
        return __before(node, content);
      });
      return this;
    },

    after: function(args) {
      if (!this.size()) return new DOMStack();
      var __after = function(node, content) {
        var parent = node.parentNode;
        if (typeof content === 'string') {
          content = $.make(content);
        }
        if (content && content.constructor.toString().match(/DOMStack/)) {
          var i = 0,
            len = content.size();
          while (i < len) {
            if (node === parent.lastChild) {
              parent.appendChild(content.array[i]);
            } else {
              parent.insertBefore(content.array[i], node.nextSibling);
            }
            i++;
          }
        } else if (content && content.nodeType === 1) {
          parent.appendChild(content);
        }
        return this;
      };
      this.forEach(function(node) {
        return __after(node, args);
      });
      return this;
    },

    prepend: function(content) {
      if (!this.size()) return new DOMStack();

      if (typeof content === 'string') {
        this.forEach(function(element) {
          element.insertAdjacentHTML('afterbegin', content);
        });
      } else if (content && content.constructor.toString().match(/DOMStack/)) {
        this.forEach(function(element) {
          content.forEach(function(node) {
            element.insertBefore(node, element.firstChild);
          });
        });
      } else if (content && content.nodeType === 1) {
        this.forEach(function(element) {
          element.insertBefore(node, element.firstChild);
        });
      }
      return this;
    },

    append: function(content) {
      if (!this.size()) return new DOMStack();

      if (typeof content === 'string') {
        this.forEach(function(element) {
          element.insertAdjacentHTML('beforeend', content);
        });
      } else if (content && content.constructor.toString().match(/DOMStack/)) {
        this.forEach(function(element) {
          content.forEach(function(node) {
            element.insertBefore(node, null);
          });
        });

      } else if (content && content.nodeType === 1) {
        this.forEach(function(element) {
          element.insertBefore(node, null);
        });
      }
      return this;
    },

    prependTo: function(selector) {
      if (!this.size()) return new DOMStack();
      this.reverse();
      this.forEach(function(item) {
        return $(selector).prepend(item);
      });
      return this;
    },

    appendTo: function(selector) {
      if (!this.size()) return new DOMStack();
      this.forEach(function(item) {
        return $(selector).append(item);
      });
      return this;
    },

    clone: function(value) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      this.forEach(function(ctx) {
        if (value === true || !value) {
          ret.push(ctx.cloneNode(true));
        } else {
          ret.push(ctx.cloneNode(false));
        }
      });
      return ret;
    },

    wrap: function(string) {
      if (!this.size() || !string) return new DOMStack();
      var tempNode;
      var empNode;
      var whichClone;
      this.forEach(function(ctx) {
        tempNode = $.make(string);
        empNode = tempNode.array[0];
        whichClone = $(ctx).clone(true);
        tempNode.append(whichClone);
        $(ctx).before(tempNode);
        $(ctx).remove();
      });
    },

    unwrap: function() {
      if (!this.size()) return new DOMStack();
      var parentNode = null;
      this.forEach(function(node) {
        if (node.parentNode === parentNode) {
          return;
        }
        parentNode = node.parentNode;
        if (node.parentNode.nodeName === 'BODY') {
          return false;
        }
        $.replace(node, node.parentNode);
      });
    },

    offset: function() {
      if (!this.size())
        return;
      var offset = this.eq(0).array[0].getBoundingClientRect();
      return {
        top: Math.round(offset.top),
        left: Math.round(offset.left)
      };
    },

    position: function() {
      var obj = {
        top: 0,
        left: 0
      };
      var pos = this.array[0].getBoundingClientRect();
      var borderTop = parseInt(this.parent().css('border-top-width'), 10) || 0;
      var borderLeft = parseInt(this.parent().css('border-left-width'), 10) || 0;
      var parentPos = this.array[0].parentNode.getBoundingClientRect();
      var compareOffsets1 = function(val1, val2) {
        return Math.round(val1 - val2);
      };
      obj.top = compareOffsets1(pos.top, (parentPos.top + borderTop));
      obj.left = compareOffsets1(pos.left, (parentPos.left + borderLeft));
      return obj;
    },

    empty: function() {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      this.forEach(function(ctx) {
        // $(ctx).unbind();
        ctx.textContent = '';
        ret.push(ctx);
      });
      return ret;
    },

    html: function(content) {
      if (!this.size()) return new DOMStack();
      if (content === '') {
        this.array[0].innerHTML = '';
      } else if (content) {
        this.array[0].innerHTML = content;
        return new DOMStack(this.array[0]);
      } else if (!content) {
        return this.array[0].innerHTML.trim();
      }
    },

    text: function(string) {
      var ret = '';
      if (!this.size()) return new DOMStack();
      if (!!string || string === 0) {
        this.forEach(function(element) {
          element.innerText = string;
        });
        return this;
      } else {
        this.forEach(function(element) {
          ret += element.innerText;
          ret.trim();
        });
        return ret;
      }
    },

    remove: function() {
      if (!this.size()) return new DOMStack();
      this.forEach(function(node) {
        $(node).off();
        node.parentNode.removeChild(node);
      });
    },

    addClass: function(className) {
      if (!this.size()) return new DOMStack();
      if (typeof className !== "string")
        return;
      var ret = new DOMStack();
      var classes;
      this.forEach(function(node) {
        if (/\s/.test(className)) {
          classes = className.split(' ');
          classes.forEach(function(name) {
            node.classList.add(name);
          });
        } else {
          node.classList.add(className);
        }
        ret.push(node);
      });
      return ret;
    },

    hasClass: function(className) {
      if (!this.size()) return new DOMStack();
      var temp = false;
      this.forEach(function(element) {
        if (element.classList.contains(className)) {
          temp = true;
        }
      });
      return temp;
    },

    removeClass: function(className) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      var classes;
      this.forEach(function(node) {
        if (!node)
          return;
        if (/\s/.test(className)) {
          classes = className.split(' ');
          classes.forEach(function(name) {
            node.classList.remove(name);
          });
        } else {
          node.classList.remove(className);
        }
        if (node.getAttribute('class') === '') {
          node.removeAttribute('class');
        }
        ret.push(node);
      });
      return ret;
    },

    toggleClass: function(className) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      this.forEach(function(node) {
        node.classList.toggle(className);
        ret.push(node);
      });
      return ret;
    },

    attr: function(property, value) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      var __attr = function(node, property, value) {
        if (value === undefined) {
          return node.getAttribute(property);
        } else {
          return node.setAttribute(property, value);
        }
      };
      if (value === undefined) {
        if (this[0].hasAttribute(property)) {
          return this[0].getAttribute(property);
        }
      } else {
        this.forEach(function(node) {
          __attr(node, property, value);
          ret.push(node);
        });
      }
      if (ret.length) {
        return ret;
      }
    },

    removeAttr: function(attribute) {
      if (!this.size()) return new DOMStack();
      var ret = new DOMStack();
      this.forEach(function(node) {
        if (!!node.hasAttribute(attribute)) {
          node.removeAttribute(attribute);
          ret.push(node);
        }
      });
      return ret;
    },

    prop: function(property, value) {
      if (!this.size()) return new DOMStack();
      if (value === false || !!value) {
        this.forEach(function(element) {
          element[property] = value;
        });
        return this;
      } else if (this.array[0] && this.array[0][property]) {
        return this.array[0][property];
      }
    },

    removeProp: function(property) {
      if (!this.size()) return new DOMStack();
      this[0][property] = false;
      return [this[0]];
    },

    disable: function() {
      if (!this.size()) return new DOMStack();
      this.forEach(function(node) {
        node.classList.add('disabled');
        node.disabled = true;
        node.style.cursor = 'default';
      });
      return this;
    },

    enable: function() {
      if (!this.size()) return new DOMStack();
      this.forEach(function(node) {
        node.classList.remove('disabled');
        node.removeAttribute('disabled');
        node.style.cursor = 'auto';
      });
      return this;
    },

    val: function(value) {
      if (!this.size()) return new DOMStack();
      if (value) {
        this.array[0].value = value;
        return this;
      } else {
        if (this.array[0] && this.array[0].value) {
          return this.array[0].value;
        }
      }
    },

    hide: function() {
      var display = this.css('display');
      this.data('display_attr', display);
      this.css('display', 'none');
    },

    show: function() {
      var display = this.data('display_attr');
      this.css('display', display);
    }
  });
})();
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
        __array = [];
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
// Truck Wheels - Form Serialization Module:
(function() {
  "use strict";
  if (typeof jQuery !== 'undefined') return;

  // Serialize an object into name/value pairs 
  // for posting to server:
  //==========================================
  $.fn.extend({
    serializeArray: function() {
      var name;
      var type;
      var ret = [];
      var add = function(value) {
        if ($.type(value) === 'array') {
          return value.forEach(add);
        }
        ret.push({
          name: name,
          value: value
        });
      };
      if (this[0]) {
        $.each([].slice.apply(this[0].elements), function(_, field) {
          type = field.type;
          name = field.name;
          if (name && field.nodeName.toLowerCase() != 'fieldset' &&
            !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&
            ((type != 'radio' && type != 'checkbox') || field.checked)) {
            add($(field).val());
          }
        });
      }
      return ret;
    },

    // Serialize the values of a form:
    //================================
    serialize: function() {
      var ret = [];
      this.serializeArray().forEach(function(element) {
        ret.push(encodeURIComponent(element.name) + '=' + encodeURIComponent(element.value));
      });
      return ret.join('&');
    }
  });

  // Private function used by $.param:
  //==================================
  function serialize(params, obj, traditional, scope) {
    var type, array = $.type(obj) === 'array',
      hash = $.isEmptyObject(obj);

    // If it's an array of objects:
    if ($.type(obj) === 'array') {
      $.each(obj, function(key, value) {
        type = $.type(value);
        if (scope) {
          key = traditional ? scope : scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
        }
        if (!scope && array) {
          params.add(value.name, value.value);
        } else if (type == "array" || (!traditional && type == "object")) {
          serialize(params, value, traditional, key);
        } else {
          params.add(key, value);
        }
      });

      // Else its an object (use key/value loop):
    } else if ($.type(obj) === 'object') {
      for (var key in obj) {
        type = $.type(obj[key]);
        if (scope) {
          key = traditional ? scope : scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
        }
        if (!scope && array) {
          params.add(obj[key].name, obj[key].obj[key]);
        } else if (type == "array" || (!traditional && type == "object")) {
          serialize(params, obj[key], traditional, key);
        } else {
          params.add(key, obj[key]);
        }
      }
    }
  }

  $.extend({

    // Serialize an object for posting to server:
    //===========================================
    param: function(obj, traditional) {
      var params = [];
      params.add = function(key, value) {
        if ($.type(value) === 'function') value = value();
        if (value === null) value = "";
        this.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
      };
      serialize(params, obj, traditional);
      return params.join('&').replace(/%20/g, '+');
    }
  });
})();
// Truck Wheels - Events Module:
(function() {
  "use strict";
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
// Truck Engine - Environment Module:
(function() {
  "use strict";
  $.extend({
    isiPhone: /iphone/img.test(navigator.userAgent),

    isiPad: /ipad/img.test(navigator.userAgent),

    isiPod: /ipod/img.test(navigator.userAgent),

    isiOS: /ip(hone|od|ad)/img.test(navigator.userAgent),

    isAndroid: (/android/img.test(navigator.userAgent) && !/trident/img.test(navigator.userAgent)),

    isWebOS: /webos/img.test(navigator.userAgent),

    isBlackberry: /blackberry/img.test(navigator.userAgent),

    isTouchEnabled: !/trident/img.test(navigator.userAgent) && !/edge/img.test(navigator.userAgent) && 'createTouch' in document,

    isOnline: navigator.onLine,

    isStandalone: navigator.standalone,

    isWin: /edge/img.test(navigator.userAgent) || /trident/img.test(navigator.userAgent),

    isIE10: /msie 10/img.test(navigator.userAgent),

    isIE11: (/windows nt/img.test(navigator.userAgent) && /trident/img.test(navigator.userAgent)),

    isWebkit: (!/trident/img.test(navigator.userAgent) && !/edge/img.test(navigator.userAgent) && /webkit/img.test(navigator.userAgent)),

    isDesktop: (!/mobile/img.test(navigator.userAgent)),

    isSafari: (!/edge/img.test(navigator.userAgent) && !/Chrome/img.test(navigator.userAgent) && /Safari/img.test(navigator.userAgent) && !/android/img.test(navigator.userAgent)),

    isChrome: !/trident/img.test(navigator.userAgent) && !/edge/img.test(navigator.userAgent) && /Chrome/img.test(navigator.userAgent) && !((/samsung/img.test(navigator.userAgent) || /Galaxy Nexus/img.test(navigator.userAgent) || /HTC/img.test(navigator.userAgent) || /LG/img.test(navigator.userAgent)) && !/trident/img.test(navigator.userAgent) && !/edge/img.test(navigator.userAgent) && /android/i.test(navigator.userAgent) && /webkit/i.test(navigator.userAgent)),

    isNativeAndroid: ((/samsung/img.test(navigator.userAgent) || /Galaxy Nexus/img.test(navigator.userAgent) || /HTC/img.test(navigator.userAgent) || /LG/img.test(navigator.userAgent)) && !/trident/img.test(navigator.userAgent) && !/edge/img.test(navigator.userAgent) && /android/i.test(navigator.userAgent) && /webkit/i.test(navigator.userAgent))
  });
})();
// Truck Engine - Event Alias Module:
(function() {
  "use strict";
  $.extend({
    eventStart: null,
    eventEnd: null,
    eventMove: null,
    eventCancel: null,
    // Define min-length for gesture detection:
    gestureLength: 30
  });

  $(function() {
    //////////////////////////
    // Setup Event Variables:
    //////////////////////////
    // Pointer events for IE10 and WP8:
    if (window.navigator.pointerEnabled) {
      $.eventStart = 'pointerdown';
      $.eventEnd = 'pointerup';
      $.eventMove = 'pointermove';
      $.eventCancel = 'pointercancel';
      // Pointer events for IE10 and WP8:
    } else if (window.navigator.msPointerEnabled) {
      $.eventStart = 'MSPointerDown';
      $.eventEnd = 'MSPointerUp';
      $.eventMove = 'MSPointerMove';
      $.eventCancel = 'MSPointerCancel';
      // Touch events for iOS & Android:
    } else if ('ontouchstart' in window && /mobile/img.test(navigator.userAgent)) {
      $.eventStart = 'touchstart';
      $.eventEnd = 'touchend';
      $.eventMove = 'touchmove';
      $.eventCancel = 'touchcancel';
      // Mouse events for desktop:
    } else {
      $.eventStart = 'mousedown';
      $.eventEnd = 'click';
      $.eventMove = 'mousemove';
      $.eventCancel = 'mouseout';
    }
  });
})();
// Truck Engine - Gestures Module:
(function() {
  "use strict";
  //////////////////////////////////////////////////////
  // Swipe Gestures for ChocolateChip-UI.
  // Includes mouse gestures for desktop compatibility.
  //////////////////////////////////////////////////////
  var touch = {};
  var touchTimeout;
  var swipeTimeout;
  var tapTimeout;
  var longTapDelay = 750;
  var singleTapDelay = 150;
  $.gestureLength = 50;
  if ($.isAndroid) singleTapDelay = 200;
  var longTapTimeout;

  function parentIfText(node) {
    return 'tagName' in node ? node : node.parentNode;
  }

  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >=
      Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down');
  }

  function longTap() {
    longTapTimeout = null;
    if (touch.last) {
      try {
        if (touch && touch.el) {
          touch.el.trigger('longtap');
          touch = {};
        }
      } catch (err) {}
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout);
    longTapTimeout = null;
  }

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout);
    if (tapTimeout) clearTimeout(tapTimeout);
    if (swipeTimeout) clearTimeout(swipeTimeout);
    if (longTapTimeout) clearTimeout(longTapTimeout);
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
    touch = {};
  }
  $(function() {
    var now;
    var delta;
    var body = $('body');
    var twoTouches = false;

    // Capture start of event:
    //========================
    body.on($.eventStart, function(e) {
      now = Date.now();
      delta = now - (touch.last || now);
      if (e.originalEvent) e = e.originalEvent;

      // Handle MSPointer Events:
      if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
        if (window && window.jQuery && $ === window.jQuery) {
          if (e.originalEvent && !e.originalEvent.isPrimary) return;
        } else {
          if (!e.isPrimary) return;
        }
        e = e.originalEvent ? e.originalEvent : e;
        body.on('MSHoldVisual', function(e) {
          e.preventDefault();
        });
        touch.el = $(parentIfText(e.target));
        touchTimeout && clearTimeout(touchTimeout); // jshint ignore:line
        touch.x1 = e.pageX;
        touch.y1 = e.pageY;
        twoTouches = false;
      } else {
        if ($.eventStart === 'mousedown') {
          touch.el = $(parentIfText(e.target));
          touchTimeout && clearTimeout(touchTimeout); // jshint ignore:line
          touch.x1 = e.pageX;
          touch.y1 = e.pageY;
          twoTouches = false;
        } else {
          // User to detect two or more finger gestures:
          if (e.touches.length === 1) {
            touch.el = $(parentIfText(e.touches[0].target));
            touchTimeout && clearTimeout(touchTimeout); // jshint ignore:line
            touch.x1 = e.touches[0].pageX;
            touch.y1 = e.touches[0].pageY;
            if (e.targetTouches.length === 2) {
              twoTouches = true;
            } else {
              twoTouches = false;
            }
          }
        }
      }
      if (delta > 0 && delta <= 250) {
        touch.isDoubleTap = true;
      }
      touch.last = now;
      longTapTimeout = setTimeout(longTap, longTapDelay);
    });

    // Capture event move:
    //====================
    body.on($.eventMove, function(e) {
      if (e.originalEvent) e = e.originalEvent;
      if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
        if (window && window.jQuery && $ === window.jQuery) {
          if (e.originalEvent && !e.originalEvent.isPrimary) return;
        } else {
          if (!e.isPrimary) return;
        }
        e = e.originalEvent ? e.originalEvent : e;
        cancelLongTap();
        touch.x2 = e.pageX;
        touch.y2 = e.pageY;
      } else {
        cancelLongTap();
        if ($.eventMove === 'mousemove') {
          touch.x2 = e.pageX;
          touch.y2 = e.pageY;
        } else {
          // One finger gesture:
          if (e.touches.length === 1) {
            touch.x2 = e.touches[0].pageX;
            touch.y2 = e.touches[0].pageY;
          }
        }
      }
    });

    // Capture event end:
    //===================
    body.on($.eventEnd, function(e) {
      if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
        if (window && window.jQuery && $ === window.jQuery) {
          if (e.originalEvent && !e.originalEvent.isPrimary) return;
        } else {
          if (!e.isPrimary) return;
        }
      }
      cancelLongTap();
      if (!!touch.el) {
        // Swipe detection:
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > $.gestureLength) ||
          (touch.y2 && Math.abs(touch.y1 - touch.y2) > $.gestureLength)) {
          swipeTimeout = setTimeout(function() {
            if (touch && touch.el) {
              touch.el.trigger('swipe');
              touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)));
              touch = {};
            }
          }, 0);
          // Normal tap:
        } else if ('last' in touch) {
          // Delay by one tick so we can cancel the 'tap' event if 'scroll' fires:
          tapTimeout = setTimeout(function() {
            // Trigger double tap immediately:
            if (touch && touch.isDoubleTap) {
              if (touch && touch.el) {
                touch.el.trigger('doubletap');
                touch = {};
              }
            } else {
              // Trigger tap after singleTapDelay:
              touchTimeout = setTimeout(function() {
                touchTimeout = null;
                if (touch && touch.el) {
                  touch.el.trigger('tap');
                  touch = {};
                  return false;
                }
              }, singleTapDelay);
            }
          }, 0);
        }
      } else {
        return;
      }
    });
    body.on('touchcancel', cancelAll);
  });

  // Register events:
  //=================
  ['swipe', 'swipeleft', 'swiperight', 'swipeup', 'swipedown', 'tap', 'doubletap', 'longtap'].forEach(function(method) {
    $.fn.extend({
      method: function(callback) {
        return this.on(method, callback);
      }
    });
  });
})();
// Truck Engine - Plugins Module:
(function() {
  "use strict";
  $.extend({
    // Replace target element with new element:
    replace: function(newElement, targetElement) {
      if (!newElement || !targetElement) return;
      var newEl, targEl;
      if (typeof newElement === 'string') {
        newEl = $(newElement)[0];
      } else if (newElement.constructor.toString().match(/DOMStack/)) {
        newEl = newElement[0];
      } else if (newElement.nodeType === 1) {
        newEl = newElement;
      }
      if (typeof targetElement === 'string') {
        targEl = $(targetElement)[0];
      } else if (targetElement.constructor.toString().match(/DOMStack/)) {
        targEl = targetElement[0];
      } else if (targetElement.nodeType === 1) {
        targEl = targetElement;
      }
      // Remove target's bound events:
      $(targEl).off();
      targEl.parentNode.replaceChild(newEl, targEl);
    },

    // Extra boolean types:
    isEmptyObject: function(obj) {
      return Object.keys(obj).length === 0;
    },

    isInteger: function(number) {
      return (typeof number === 'number' && number % 1 === 0);
    },

    isFloat: function(number) {
      return (typeof number === 'number' && number % 1 !== 0);
    },

    encode: function(value) {
      return encodeURIComponent(value);
    },

    escapeHTML: function(data) {
      var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '(': '%28',
        ')': '%29'
      };
      var str = JSON.stringify(data);

      var replaceTag = function(tag) {
        return tagsToReplace[tag] || tag;
      };

      var safe_tags_replace = function(str) {
        return str.replace(/[&<>]/g, replaceTag);
      };
      str = safe_tags_replace(str);
      return JSON.parse(str);
    },

    concat: function(args) {
      return (args instanceof Array) ? args.join('') : [].slice.apply(arguments).join('');
    }
  });

  if (typeof $.uuid !== 'function') {
    $.extend({
      // Make a UUID:
      uuid: function() {
        var d = Date.now();
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
        var randomLetter = charset[Math.floor(Math.random() * charset.length)];
        return randomLetter + 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
      }
    });
  }

  // Property checks for one-liners:
  $.fn.extend({
    iz: function(selector) {
      var ret = $();
      this.forEach(function(ctx) {
        if ($(ctx).is(selector)) {
          ret.push(ctx);
        }
      });
      return ret;
    },

    iznt: function(selector) {
      var ret = $();
      this.each(function(_, ctx) {
        if (!$(ctx).is(selector)) {
          ret.push(ctx);
        }
      });
      return ret;
    },

    haz: function(selector) {
      var ret;
      if (typeof jQuery !== 'undefined') {
        ret = this.has(selector);
      } else {
        ret = new DOMStack();
        this.forEach(function(element) {
          if ($(element).has(selector)[0]) {
            ret.push(element);
          }
        });
      }
      return ret;
    },

    haznt: function(selector) {
      var ret;
      if (typeof jQuery !== 'undefined') {
        ret = $();
        this.each(function(_, element) {
          if (!$(element).has(selector)[0]) {
            ret.push(element);
          }
        });
      } else {
        ret = new DOMStack();
        this.forEach(function(element) {
          if (!$(element).has(selector)[0]) {
            ret.push(element);
          }
        });
      }
      return ret;
    },

    hazClass: function(className) {
      if (className) {
        return this.iz('.' + className);
      } else {
        return new DOMStack();
      }
    },

    hazntClass: function(className) {
      if (className) {
        return this.iznt('.' + className);
      } else {
        return new DOMStack();
      }
    },

    hazAttr: function(attribute) {
      if (attribute) {
        return this.iz('[' + attribute + ']');
      } else {
        return new DOMStack();
      }
    },

    hazntAttr: function(attribute) {
      if (attribute) {
        return this.iznt('[' + attribute + ']');
      } else {
        return new DOMStack();
      }
    }
  });

  // Polyfill for proper forEach for jQuery:
  if (typeof jQuery !== 'undefined') {
    $.fn.extend({
      // callback.call(this.array[i], this.array[i], i);
      forEach: function(callback) {
        this.each(function(idx, ctx) {
          callback.call(ctx, ctx, idx);
        });

      },

      disable: function() {
        if (!this.size()) return $();
        this.forEach(function(node) {
          node.classList.add('disabled');
          node.disabled = true;
          node.style.cursor = 'default';
        });
        return this;
      },

      enable: function() {
        if (!this.size()) return $();
        this.forEach(function(node) {
          node.classList.remove('disabled');
          node.removeAttribute('disabled');
          node.style.cursor = 'auto';
        });
        return this;
      }
    });
  }
})();
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
// Truck Engine - Promises Module:
(function() {
  "use strict";
  /*jshint validthis:true */
  var extend;
  var cycle;
  var queue;
  extend = function(obj, name, val, config) {
    return Object.defineProperty(obj, name, {
      value: val,
      writable: true,
      configurable: config !== false
    });
  };
  queue = (function() {
    var first, last, item;

    function Item(func, self) {
      this.func = func;
      this.self = self;
      this.next = undefined;
    }
    return {
      add: function(func, self) {
        item = new Item(func, self);
        if (last) {
          last.next = item;
        } else {
          first = item;
        }
        last = item;
        item = undefined;
      },
      unshift: function() {
        var f = first;
        first = last = cycle = undefined;
        while (f) {
          f.func.call(f.self);
          f = f.next;
        }
      }
    };
  })();

  function schedule(func, self) {
    queue.add(func, self);
    if (!cycle) {
      cycle = setTimeout(queue.unshift);
    }
  }
  // Check that Promise is thenable:
  function isThenable(obj) {
    var _then, obj_type = typeof obj;
    if (obj !== null &&
      (obj_type === "object" || obj_type === "function")) {
      _then = obj.then;
    }
    return typeof _then === "function" ? _then : false;
  }

  function notify() {
    for (var i = 0; i < this.chain.length; i++) {
      notifyIsolated(this, (this.state === 1) ? this.chain[i].success : this.chain[i].failure, this.chain[i]);
    }
    this.chain.length = 0;
  }

  function notifyIsolated(self, callback, chain) {
    var ret, _then;
    try {
      if (callback === false) {
        chain.reject(self.msg);
      } else {
        if (callback === true) {
          ret = self.msg;
        } else {
          ret = callback.call(undefined, self.msg);
        }
        if (ret === chain.promise) {
          chain.reject(new TypeError("Promise-chain cycle"));
        } else if (_then === isThenable(ret)) {
          _then.call(ret, chain.resolve, chain.reject);
        } else {
          chain.resolve(ret);
        }
      }
    } catch (err) {
      chain.reject(err);
    }
  }

  function resolve(msg) {
    var _then, deferred, self = this;
    if (self.triggered) {
      return;
    }
    self.triggered = true;
    if (self.deferred) {
      self = self.deferred;
    }
    try {
      if (_then = isThenable(msg)) { // jshint ignore:line
        schedule(function() {
          var deferred_wrapper = new MakeDeferred(self);
          try {
            _then.call(msg, function() {
              resolve.apply(deferred_wrapper, arguments);
            }, function() {
              reject.apply(deferred_wrapper, arguments);
            });
          } catch (err) {
            reject.call(deferred_wrapper, err);
          }
        });
      } else {
        self.msg = msg;
        self.state = 1;
        if (self.chain.length > 0) {
          schedule(notify, self);
        }
      }
    } catch (err) {
      reject.call(new MakeDeferred(self), err);
    }
  }

  function reject(msg) {
    var self = this;
    if (self.triggered) {
      return;
    }
    self.triggered = true;
    if (self.deferred) {
      self = self.deferred;
    }
    self.msg = msg;
    self.state = 2;
    if (self.chain.length > 0) {
      schedule(notify, self);
    }
  }

  function iteratePromises(Constructor, arr, resolver, rejecter) {
    for (var idx = 0; idx < arr.length; idx++) {
      (function IIFE(idx) {
        Constructor.resolve(arr[idx])
          .then(function(msg) {
            resolver(idx, msg);
          }, rejecter);
      })(idx);
    }
  }

  function MakeDeferred(self) {
    this.deferred = self;
    this.triggered = false;
  }

  function Deferred(self) {
    this.promise = self;
    this.state = 0;
    this.triggered = false;
    this.chain = [];
    this.msg = undefined;
  }

  function Promise(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("Not a function");
    }
    if (this.isValidPromise !== 0) {
      throw new TypeError("Not a promise");
    }
    // Indicate the Promise is initialized:
    this.isValidPromise = 1;
    var deferred = new Deferred(this);
    this.then = function(success, failure) {
      var obj = {
        success: typeof success === "function" ? success : true,
        failure: typeof failure === "function" ? failure : false
      };
      // `.then()` can be used against a different promise
      // constructor for making a chained promise.
      obj.promise = new this.constructor(function extractChain(resolve, reject) {
        if (typeof resolve !== "function" || typeof reject !== "function") {
          throw new TypeError("Not a function");
        }
        obj.resolve = resolve;
        obj.reject = reject;
      });
      deferred.chain.push(obj);
      if (deferred.state !== 0) {
        schedule(notify, deferred);
      }
      return obj.promise;
    };
    this.catch = function(failure) {
      return this.then(undefined, failure);
    };
    try {
      executor.call(undefined, function(msg) {
        resolve.call(deferred, msg);
      }, function(msg) {
        reject.call(deferred, msg);
      });
    } catch (err) {
      reject.call(deferred, err);
    }
  }
  var PromisePrototype = extend({}, "constructor", Promise, false);
  extend(Promise, "prototype", PromisePrototype, false);
  // Check if Promise is initialized:
  extend(PromisePrototype, "isValidPromise", 0, false);
  extend(Promise, "resolve", function(msg) {
    var Constructor = this;
    // Make sure it is a valide Promise:
    if (msg && typeof msg === "object" && msg.isValidPromise === 1) {
      return msg;
    }
    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve !== "function" || typeof reject !== "function") {
        throw new TypeError("Not a function");
      }
      resolve(msg);
    });
  });
  extend(Promise, "reject", function(msg) {
    return new this(function executor(resolve, reject) {
      if (typeof resolve !== "function" || typeof reject !== "function") {
        throw new TypeError("Not a function");
      }
      reject(msg);
    });
  });
  extend(Promise, "all", function(arr) {
    var Constructor = this;
    // Make sure argument is an array:
    if (Object.prototype.toString.call(arr) !== "[object Array]") {
      return Constructor.reject(new TypeError("Not an array"));
    }
    if (arr.length === 0) {
      return Constructor.resolve([]);
    }
    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve !== "function" || typeof reject !== "function") {
        throw new TypeError("Not a function");
      }
      var len = arr.length,
        msgs = new Array(len),
        count = 0;
      iteratePromises(Constructor, arr, function resolver(idx, msg) {
        msgs[idx] = msg;
        if (++count === len) {
          resolve(msgs);
        }
      }, reject);
    });
  });
  extend(Promise, "race", function(arr) {
    var Constructor = this;
    // Make sure argument is an array:
    if (Object.prototype.toString.call(arr) !== "[object Array]") {
      return Constructor.reject(new TypeError("Not an array"));
    }
    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve !== "function" || typeof reject !== "function") {
        throw new TypeError("Not a function");
      }
      iteratePromises(Constructor, arr, function resolver(idx, msg) {
        resolve(msg);
      }, reject);
    });
  });
  // If native Promise exists in window, do not use this.
  if ("Promise" in window && "resolve" in window.Promise && "reject" in window.Promise && "all" in window.Promise && "race" in window.Promise) {
    return;
  } else {
    // Otherwise do use this:
    return window.Promise = Promise;
  }
})();
// Truck Engine - Fetch Module
(function(self) {
  'use strict';

  if (self.fetch) {
    return;
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value;
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var list = this.map[name];
    if (!list) {
      list = [];
      this.map[name] = list;
    }
    list.push(value);
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)];
    return values ? values[0] : null;
  };

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || [];
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)];
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this);
      }, this);
    }, this);
  };

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    return fileReaderReady(reader);
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    reader.readAsText(blob);
    return fileReaderReady(reader);
  }

  var support = {
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    })(),
    formData: 'FormData' in self
  };

  function Body() {
    this.bodyUsed = false;


    this._initBody = function(body) {
      this._bodyInit = body;
      if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (!body) {
        this._bodyText = '';
      } else {
        throw new Error('unsupported BodyInit type');
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer);
      };

      this.text = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob);
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text');
        } else {
          return Promise.resolve(this._bodyText);
        }
      };
    } else {
      this.text = function() {
        var rejected = consumed(this);
        return rejected ? rejected : Promise.resolve(this._bodyText);
      };
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode);
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse);
    };

    return this;
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return (methods.indexOf(upcased) > -1) ? upcased : method;
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = input;
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this);
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function headers(xhr) {
    var head = new Headers();
    var pairs = xhr.getAllResponseHeaders().trim().split('\n');
    pairs.forEach(function(header) {
      var split = header.trim().split(':');
      var key = split.shift().trim();
      var value = split.join(':').trim();
      head.append(key, value);
    });
    return head;
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }
    this._initBody(bodyInit);
    this.type = 'default';
    this.status = options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options.statusText;
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
    this.url = options.url || '';
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };

  Response.error = function() {
    var response = new Response(null, {
      status: 0,
      statusText: ''
    });
    response.type = 'error';
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new Response(null, {
      status: status,
      headers: {
        location: url
      }
    });
  };
  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request;
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input;
      } else {
        request = new Request(input, init);
      }

      var xhr = new XMLHttpRequest();

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL;
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL');
        }

        return;
      }

      xhr.onload = function() {
        var status = (xhr.status === 1223) ? 204 : xhr.status;
        if (status < 100 || status > 599) {
          reject(new TypeError('Network request failed'));
          return;
        }
        var options = {
          status: status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        };
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };
  self.fetch.polyfill = true;
  /**
   *
   * JSONP with API like fetch.
   */
  $.extend({
    // Container for jsonp methods:
    JSONPCallbacks: [],
    // JSONP method:
    jsonp: function(url, opts) {
      var settings = {
        timeout: 2000,
        callbackName: 'callback',
        clear: true
      };
      if (opts) {
        $.extend(settings, opts);
      }
      // Method to create callback:
      function generateCallbackName() {
        var callbackName = settings.callbackName + '_' + ($.JSONPCallbacks.length + 1);
        $.JSONPCallbacks.push(callbackName);
        return callbackName;
      }
      var callbackName = generateCallbackName();
      // Create and return Promise with result from request:
      return new Promise(function(resolve, reject) {
        var timeout;
        window.jsonp = window.jsonp || {};
        window.jsonp[callbackName] = function(response) {
          resolve({
            ok: true,
            json: function() {
              return Promise.resolve(response);
            }
          });
          if (timeout) {
            clearTimeout(timeout);
          }
        };
        // Create script tag:
        var script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = url + (url.indexOf('?') > -1 ? '&' : '?') + 'callback=jsonp.' + callbackName;
        document.body.appendChild(script);
        // Delete script tag:
        setTimeout(function() {
          script.parentNode.removeChild(script);
        });
        // Clear JSONP methods from window:
        if (settings.clear) {
          var pos = $.JSONPCallbacks.indexOf(callbackName);
          $.JSONPCallbacks.splice(pos, 1);
        }
        // Handle timeout:
        timeout = setTimeout(function() {
          reject(new Error('JSONP request to ' + url + ' timed out'));
        }, settings.timeout);
      });
    },
    // Helper function for fetch Promises.
    // Usage: .then(json)
    json: function(response) {
      return response.json();
    }
  });
})(window);
// Truck Engine - Formatters Module:
(function() {
  "use strict";
  ////////////////////////////////
  // Format Numbers for Thousands:
  ////////////////////////////////
  $.extend({
    formatNumber: function(amount, separator, decimal) {
      var sep = separator || ",";
      // Allow the user to round a float to a whole number:
      if (decimal === 0) {
        var num = Math.round(amount);
        return Number(num).toString().replace(/(?=(?:\d{3})+$)(?!^)/g, sep);
      }
      if (decimal === undefined) {
        // Check if amount is a float:
        if (typeof amount === 'number' && amount % 1 !== 0) {
          return Number(amount).toString().replace(/\d(?=(\d{3})+\.)/g, '$&' + sep);
          // Otherwise treat it as an integer:
        } else {
          return Number(amount).toString().replace(/(?=(?:\d{3})+$)(?!^)/g, sep);
        }
        // If a decimal value was provided,
        // format it to that amount:
      } else {
        return Number(amount).toFixed(decimal).replace(/\d(?=(\d{3})+\.)/g, '$&' + sep);
      }
    },

    /////////////////////////
    // Return sum of numbers:
    /////////////////////////
    sum: function(arr) {
      var ret;
      if (Array.isArray(arr) && arr.length) {
        ret = arr;
      } else {
        ret = [].slice.apply(arguments);
      }
      return ret.reduce(function(a, b) {
        return a + b;
      });
    },

    ///////////////////
    // Format currency:
    ///////////////////
    currency: function(amount, symbol, separator, decimal) {
      var sym = symbol || "$";
      var sep = separator || ",";
      var dec = decimal || 2;
      var zero = false;
      if (decimal === 0) {
        zero = true;
      }
      // Private function to format amounts:
      var formatNumber = function(amount, sep) {
        // A decimal value of '0' means
        // we need to round the amount off
        // before adding in thousands separators:
        if (zero) {
          var num = Math.round(amount);
          return Number(num).toString().replace(/^0+/, '').replace(/(?=(?:\d{3})+$)(?!^)/g, sep);
        } else {
          // Otherwise, we can just add the thousands
          // separators with the decimal placement
          // provided by the user or the default:
          return Number(amount).toFixed(dec).replace(/^0+/, '').replace(/\d(?=(\d{3})+\.)/g, '$&' + sep);
        }
      };
      return sym + formatNumber(amount, sep);
    },

    ///////////////
    // Format Time:
    ///////////////
    formatTime: function(time) {
      var temp = time.split(':');
      var temp2 = temp[0] + ':' + temp[1];
      var ampm = time.split(' ')[1];
      return temp2 + ' ' + ampm;
    },

    sortDate: function(date1, date2) {
      return new Date(date1) - new Date(date2);
    },

    ////////////////
    // Sort Numbers:
    ////////////////
    sortNumbers: function(a, b) {
      return a - b;
    },

    sortNumbersDescending: function(a, b) {
      return b - a;
    }

  });
})();
// Truck Engine - Validators Module:
(function() {
  "use strict";
  // Set validity state of form elements:
  var setValidityStatus = function(element, valid) {
    if (valid) {
      element[0].valid = true;
      element[0].invalid = false;
      element.addClass('valid').removeClass('invalid');
    } else {
      element[0].valid = false;
      element[0].invalid = true;
      element.addClass('invalid').removeClass('valid');
    }
  };

  // Used to check input validity:
  var checkValidity = function(element, expression) {
    if (expression) {
      setValidityStatus(element, true);
    } else {
      setValidityStatus(element, false);
    }
    return expression;
  };

  $.fn.extend({
    isNotEmpty: function(ctx) {
      if (this[0].nodeName !== 'INPUT') return;
      return checkValidity(this, this[0].nodeName === 'INPUT' && this[0].value);
    },

    validateAlphabetic: function() {
      if (this[0].nodeName !== 'INPUT') return;
      var letters = /^[A-Za-z]+$/;
      var value = this[0].nodeName === 'INPUT' && this[0].value;
      checkValidity(this, value.match(letters));
      if (value) {
        return checkValidity(this, value.match(letters));
      }
    },

    validateNumber: function() {
      if (this[0].nodeName !== 'INPUT') return;
      var numbers = /^[+-]?\d+(\.\d+)?$/;
      var value = this[0].nodeName === 'INPUT' && this[0].value;
      checkValidity(this, value.match(numbers));
      if (value) {
        return checkValidity(this, value.match(numbers));
      }
    },

    validateAlphaNumeric: function() {
      if (this[0].nodeName !== 'INPUT') return;
      var letters = /^[0-9a-zA-Z]+$/;
      var value = this[0].nodeName === 'INPUT' && this[0].value;
      checkValidity(this, value.match(letters));
      if (value) {
        return checkValidity(this, value.match(letters));
      }
    },

    validateUserName: function(minimum) {
      if (this[0].nodeName !== 'INPUT') return;
      var letters = /^[a-zA-Z0-9]+$/;
      var username = this[0].value;
      if (!username) return checkValidity(this, username);
      if (minimum && username.match(letters)) {
        if (username.length >= minimum) {
          return checkValidity(this, username);
        } else {
          return checkValidity(this, false);
        }
      } else {
        return checkValidity(this, checkValidity(this, username.match(letters)));
      }
    },

    validateEmail: function() {
      if (this[0].nodeName !== 'INPUT') return;
      var value = this[0].value;
      var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (value) {
        return checkValidity(this, value.match(email));
      } else {
        return checkValidity(this, false);
      }
    },

    validatePhoneNumber: function() {
      if (this[0].nodeName !== 'INPUT') return;
      var phone;
      var phoneNumber;
      var convertLettersToNumbers = function(value) {
        var phonenumber = "";
        value = value.toLowerCase();
        var len = value.length;
        for (var i = 0; i < len; i++) {
          var character = value.charAt(i);
          switch (character) {
            case '0':
              phonenumber += "0";
              break;
            case '1':
              phonenumber += "1";
              break;
            case '2':
              phonenumber += "2";
              break;
            case '3':
              phonenumber += "3";
              break;
            case '4':
              phonenumber += "4";
              break;
            case '5':
              phonenumber += "5";
              break;
            case '6':
              phonenumber += "6";
              break;
            case '7':
              phonenumber += "7";
              break;
            case '8':
              phonenumber += "8";
              break;
            case '9':
              phonenumber += "9";
              break;
            case '-':
              phonenumber += "-";
              break;
            case 'a':
            case 'b':
            case 'c':
              phonenumber += "2";
              break;
            case 'd':
            case 'e':
            case 'f':
              phonenumber += "3";
              break;
            case 'g':
            case 'h':
            case 'i':
              phonenumber += "4";
              break;
            case 'j':
            case 'k':
            case 'l':
              phonenumber += "5";
              break;
            case 'm':
            case 'n':
            case 'o':
              phonenumber += "6";
              break;
            case 'p':
            case 'q':
            case 'r':
            case 's':
              phonenumber += "7";
              break;
            case 't':
            case 'u':
            case 'v':
              phonenumber += "8";
              break;
            case 'w':
            case 'x':
            case 'y':
            case 'z':
              phonenumber += "9";
              break;
          }
        }
        return phonenumber;
      };
      if (this[0].value) {

        // International Numbers:
        if (int) {
          phoneNumber = this[0].value.replace(/[\(\)\.\-\ ]/g, '');
          return checkValidity(this, this.isNotEmpty() && !isNaN(phoneNumber));

          // North America (US and Canada):
        } else {
          phoneNumber = this[0].value.replace(/[\(\)\.\-\ ]/g, '');
          phoneNumber = convertLettersToNumbers(phoneNumber);
          phone = /((\(\d{3}\)?)|(\d{3}))([\s-./]?)(\d{3})([\s-./]?)(\d{4})/;
          return checkValidity(this, phoneNumber.match(phone));
        }
      } else {
        return checkValidity(this, false);
      }
    },

    validateUrl: function() {
      if (this[0].nodeName !== 'INPUT') return;
      if (this[0].value) {
        var url = /^(ftp|http|https):\/\/([w]{3}\.)?(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
        return checkValidity(this, this[0].value.match(url));
      } else {
        return checkValidity(this, false);
      }
    },

    validateAge: function(minimum) {
      if (this[0].nodeName !== 'INPUT') return;
      if (!minimum) return;
      var age = this[0].value;
      if (age) {
        return checkValidity(this, age >= minimum);
      } else {
        return checkValidity(this, false);
      }
    },

    validateCheckbox: function() {
      if (this[0].nodeName !== 'INPUT') return;
      if (this[0].nodeName === 'INPUT' && this[0].type === 'checkbox') {
        return checkValidity(this, this[0].checked === true);
      }
    },

    validateRadioButtons: function() {
      if (this[0].nodeName !== 'INPUT') return;
      var choice = false;
      if (this[0].nodeName === 'INPUT' && this[0].type === 'radio') {
        $.each(this, function(idx, button) {
          if (button.checked === true) {
            choice = true;
          }
        });
        return checkValidity(this, choice);
      }
    },

    validateSelectBox: function() {
      if (this[0].nodeName === 'SELECT') {
        return checkValidity(this, this[0].selectedIndex);
      } else {
        return;
      }
    },

    validateSwitch: function() {
      var checkbox = this.find('input[type=checkbox]')[0];
      if (checkbox.checked) {
        return true;
      } else {
        return false;
      }
    },

    validateSelectList: function() {
      var radio = this.find('input[type=radio]');
      if (radio.iz('[checked]')[0]) {
        return true;
      } else {
        return false;
      }
    }
  });

  $.extend({
    validatePassword: function(input1, input2, minimum) {
      if (minimum && $(input1).val().length < minimum || $(input2).val().length < minimum) {
        $(input1).addClass('invalid').removeClass('valid');
        $(input2).addClass('invalid').removeClass('valid');
        return false;
      } else {
        var letters = /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/;
        if (!letters.test($(input1).val()) && !letters.test($(input2).val())) return false;
        if ($(input1).val() === $(input2).val()) {
          $(input1).removeClass('invalid').addClass('valid');
          $(input2).removeClass('invalid').addClass('valid');
        } else {
          $(input1).addClass('invalid').removeClass('valid');
          $(input2).addClass('invalid').removeClass('valid');
        }
        return $(input1).val() === $(input2).val();
      }
    },

    validateWithRegex: function(input, regex) {
      if (!regex) {
        console.error('This method requires a regular expression.');
        return;
      }
      var value = $(input).val();
      var re = new RegExp(regex);
      return checkValidity(this, value.match(re));
    }
  });
})();