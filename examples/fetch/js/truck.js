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
// Truck Wheels - Selector Module:
(function() {
  "use strict";
  //======================================
  // Define interface for selector engine:
  //======================================
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
          return __this.html(selector);
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
      return new DOMStack(document);
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
        return Truck.html(selector);
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
    Truck.extend = function(targetObject, sourceObject) {
      if (!sourceObject) {
        sourceObject = targetObject;
        targetObject = Truck;
      }
      var keys = Object.keys(sourceObject);
      var len = keys.length;
      while (len--) {
        targetObject[keys[len]] = sourceObject[keys[len]];
      }
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
  //==========================
  // Define Utilities methods:
  //==========================
  if (typeof jQuery !== 'undefined') return;
  $.extend({
    lib: "TruckJS",

    version: '1.0.0-beta.9',

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

    html: function(HTMLString) {
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

    require: function(src, callback, ctx) {
      var onerror = "onerror";
      var insertScript = function(script) {
        var firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode.insertBefore(script, firstScript);
      };
      var script = document.createElement("script");
      var done = false;
      var err;
      var loadScript;
      var handleError = function() {
        err = new Error(src || "EMPTY");
        loadScript();
      };
      var setupLoad = function(fn) {
        return function() {
          // Only call once.
          if (done) {
            return;
          }
          done = true;
          fn();
          if (callback) {
            callback.call(ctx, err);
          }
        };
      };

      loadScript = setupLoad(function() {
        script.onload = script[onerror] = null;
      });

      script[onerror] = handleError;
      script.onload = loadScript;
      script.async = true;
      script.charset = "utf-8";
      script.src = src;
      insertScript(script);
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
    },

    unique: function(array) {
      if (!array || !Array.isArray(array)) return;
      var len = array.length;
      var obj = {};
      var ret = [];
      for (var i = 0; i < len; i++) {
        var arrayItem = JSON.stringify(array[i]);
        var arrayItemValue = array[i];
        if (obj[arrayItem] === undefined) {
          ret.push(arrayItemValue);
          obj[arrayItem] = 1;
        } else {
          obj[arrayItem]++;
        }
      }
      return ret
    }
  });
})();
// Truck Wheels - Types Module:
(function() {
  "use strict";
  //==================================
  // Define method to determine types:
  //==================================
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
  //=======================
  // Define string methods:
  //=======================
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
  //====================
  // Define DOM methods:
  //====================
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
      if (!this.size()) return;
      var that = this;
      var __is = function(node, arg) {
        if (typeof arg === 'string') {
          var elements = Array.prototype.slice.apply(node.parentNode.querySelectorAll(arg));
          if (elements.length) {
            if (elements.indexOf(node) >= 0) {
              ret = true;
            }
          }
        } else if (typeof arg === 'function') {
          if (arg.call(that)) {
            ret = true;
          }
        } else if (arg.constructor.toString().match(/DOMStack/)) {
          if (node === arg[0]) {
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
      var __siblings;
      var __self = this[0];
      var __sibs = Array.prototype.slice.apply(this[0].parentNode.children);
      var pos = __sibs.indexOf(__self);
      __sibs.splice(pos, __sibs.length - 1);
      if (selector && typeof selector === 'string') {
        __siblings = this.siblings(selector).array;
        __sibs.forEach(function(element) {
          if (__siblings.indexOf(element) > -1) {
            ret.push(element);
          }
        });
      } else {
        __siblings = Array.prototype.slice.apply(this[0].parentNode.children);
        pos = __siblings.indexOf(__self);
        __siblings.splice(pos, __siblings.length - 1);
        ret.concat(__siblings);
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
      var __siblings;
      var _parent;
      var __self = this[0];
      var __sibs = Array.prototype.slice.apply(this[0].parentNode.children);
      var pos = __sibs.indexOf(__self);
      __sibs.splice(0, pos + 1);
      if (selector && typeof selector === 'string') {
        _parent = this.array[0].parentNode;
        __siblings = $(_parent).find(selector);
        __sibs.splice(0, __sibs.indexOf(this.array[0]));
        __sibs.forEach(function(element) {
          if (__siblings.array.indexOf(element) > -1) {
            ret.push(element);
          }
        });
      } else {
        __siblings = Array.prototype.slice.apply(this[0].parentNode.children);
        pos = __siblings.indexOf(__self);
        __siblings.splice(0, pos + 1);
        ret.concat(__siblings);
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
      var __siblings;
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
        __siblings = $(parent).find(selector);
        __siblings.array.splice(__siblings.array.indexOf(this.array[0]), 0);
        ret.concat(__siblings.array);
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
        if (typeof content === 'string' || typeof content === 'number') {
          content = $.html(content);
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
        if (typeof content === 'string' || typeof content === 'number') {
          content = $.html(content);
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

      if (typeof content === 'string' || typeof content === 'number') {
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

      if (typeof content === 'string' || typeof content === 'number') {
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
        tempNode = $.html(string);
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
        this.forEach(function(node) {
          node.innerHTML = '';
        });
        return this;
      } else if (content) {
        this.forEach(function(node) {
          node.innerHTML = content;
        });
        return this;
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

    replaceWith: function(content) {
      if (content && content.nodeType && content.nodeType === 1) {
        $(content).off();
      } else if (content.constructor.toString().match(/DOMStack/)) {
        content.off();
      }
      this.forEach(function(node) {
        $(node).off();
        if (typeof content === 'string') {
          $.replace($(content), node);
        } else {
          $.replace($(content), node);
        }
      });
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
      if (display === 'none' || !display) {
        display = 'block';
      }
      this.css('display', display);
    }
  });
})();
// Truck Wheels - Data Cache Module:
(function() {
  "use strict";
  //===========================================
  // Define interface for element data storage:
  //===========================================
  if (typeof jQuery !== 'undefined') return;

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
  //=========================================
  // Methods to handle form data like jQuery:
  //=========================================
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

/*
  Truck Engine. These modules are used by both Truck Engine and jQuery. They provide the functionality for the Truck Model View Controller components and other utilities and plugins for use with both libraries.
*/

// Truck Engine - Environment Module:
(function() {
  "use strict";
  $.extend({
    isiPhone: /iphone/img.test(navigator.userAgent),

    isiPad: /ipad/img.test(navigator.userAgent),

    isiPod: /ipod/img.test(navigator.userAgent),

    isiOS: /ip(hone|od|ad)/img.test(navigator.userAgent),

    isAndroid: (/android/img.test(navigator.userAgent) && !/trident/img.test(navigator.userAgent)),

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
    //=======================
    // Setup Event Variables:
    //=======================
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
  //===================================================
  // Swipe Gestures for TruckJS.
  // Includes mouse gestures for desktop compatibility.
  //===================================================
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

  // Execute this after DOM loads:
  //==============================
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
        // Handle event if jQuery or not:
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

          // Detect two or more finger gestures:
        } else {
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
  ['tap', 'doubletap', 'longtap', 'swipeleft', 'swiperight', 'swipeup', 'swipedown'].forEach(function(method) {
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
// Truck Engine - Stack Module:
(function() {
  "use strict";
  $.extend({
    //==============
    // Define Stack:
    //==============
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

        indexOf: function() {
          return __array.indexOf.apply(this.array, arguments);
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
          if (!this.exec) return;
          if (__stopAfter && __stopAfter > 0) {
            callback.call(this, data);
            __stopAfter--;
            if (!this.stopCount) this.count++;
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
// Truck Engine - Model Module:
(function() {
  "use strict";
  $.extend({
    //==============
    // Define Model:
    //==============
    Model: function(data, handle) {
      // Define handle name:
      var __handle = handle || $.uuid();
      // Init private data:
      var __data = data || '';
      data = null;

      // Used for boxing a model:
      var __name;
      var __boxName;
      var __key;
      var __autobox = false;
      var __lastBoxTime;
      var __lastModifiedTime = 0;

      var checkPublicationName = function(__handle) {
        return typeof __handle === 'string';
      };

      var propagateDataLoop = function(handle, data) {
        if ($.mediators[handle]) {
          $.mediators[handle].forEach(function(cntrl) {
            if (cntrl && cntrl.callback) {
              cntrl.callback.call(cntrl.callback, data);
            }
          });
        }
      };

      var propagateData = function(__handle, data, doNotPropogate) {
        if (!doNotPropogate) {
          propagateDataLoop(__handle, data);
        } else if (doNotPropogate && checkPublicationName(doNotPropogate) === 'string') {
          propagateDataLoop(doNotPropogate, data);
        }
      };

      // Return closure to encapsulate data:
      return {

        key: function() {
          return __key;
        },

        // Get size of array data:
        size: function() {
          if (this.hasData() && this.isIterable()) {
            return __data.length;
          }
        },

        // Define getter:
        eq: function(prop) {
          if (Array.isArray(__data)) {
            if (__data && isNaN(prop)) {
              return __data[prop];
            } else if (__data && !isNaN(prop) && prop < 0) {
              return __data[__data.length - 1];
            } else if (__data && !isNaN(prop) && prop > -1) {
              return __data[prop];
            }
          } else if (this.hasData()) {
            return __data[prop];
          }
        },

        // Allow setting a property value on an object.
        // This is for objects that are not iterable.
        setProp: function(prop, value, doNotPropogate) {
          if (!prop || (this.hasData() && this.isIterable())) {
            return;
          }
          if (!__data) {
            __data = {};
            __data[prop] = value;
            propagateData(__handle, __data, doNotPropogate);
          } else {
            __data[prop] = value;
            propagateData(__handle, __data, doNotPropogate);
          }
          __lastModifiedTime = Date.now();
        },

        // Get a property on an object.
        // This is for objects that are not iterable.
        getProp: function(prop) {
          if (!prop || (this.hasData() && this.isIterable())) {
            return;
          } else {
            return __data[prop];
          }
        },

        // Replace a single object with another.
        // This is for objects that are not iterable.
        setObject: function(obj, doNotPropogate) {
          if (!obj || (this.hasData() && this.isIterable())) {
            return;
          }
          __data = obj;
          __lastModifiedTime = Date.now();
          propagateData(__handle, __data, doNotPropogate);
        },

        // Merge new object into existing object.
        // New properties will be added,
        // existing properties will be updated.
        mergeObject: function(obj, doNotPropogate) {
          if (!obj || $.type(obj) !== 'object') return;
          var temp = this.getData();
          $.extend(temp, obj);
          this.setObject(temp, doNotPropogate);
        },

        // Define push for collections.
        // Add item to end of collection:
        push: function(data, doNotPropogate) {
          if (!data) return;
          var self = this;
          if (Array.isArray(__data)) {
            __data.push(data);
            __lastModifiedTime = Date.now();
            propagateData(__handle, data, doNotPropogate);
            if (__autobox) {
              self.box({
                key: __key
              });
            }
          }
        },

        // Define pop for collections.
        // Remove item from end of collection:
        pop: function(doNotPropogate) {
          var self = this;
          if (this.hasData() && this.isIterable()) {
            var data = __data.pop();
            __lastModifiedTime = Date.now();
            propagateData(__handle, data, doNotPropogate);
            if (__autobox) {
              self.box({
                key: __key
              });
            }
            return data;
          }
        },

        // Unshift for collections.
        // Add item to beginning of collection:
        unshift: function(data, doNotPropogate) {
          if (!data) return;
          var self = this;
          if (Array.isArray(__data)) {
            __data.unshift(data);
            __lastModifiedTime = Date.now();
            propagateData(__handle, data, doNotPropogate);
            if (__autobox) {
              self.box({
                key: __key
              });
            }
          }
        },

        // Shift for collections.
        // Remove item from beginning of collection:
        shift: function(doNotPropogate) {
          var self = this;
          if (this.hasData() && this.isIterable()) {
            var __d = __data.shift();
            __lastModifiedTime = Date.now();
            propagateData(__handle, __d, doNotPropogate);
            if (__autobox) {
              self.box({
                key: __key
              });
            }
            return __d;
          }
        },

        // Define concat for collections.
        // Merge one array into view model:
        concat: function(data, doNotPropogate) {
          if (!data) return;
          var self = this;
          if (Array.isArray(__data)) {
            __data = __data.concat(data);
            __lastModifiedTime = Date.now();
            propagateData(__handle, __data, doNotPropogate);
            if (__autobox) {
              self.box({
                key: __key
              });
            }
          }
        },

        // Define insert for collections.
        // Insert data at position:
        insert: function(position, data, doNotPropogate) {
          if (!position) return;
          var self = this;
          if (this.hasData() && this.isIterable()) {
            var len = data.length;
            // The position is greater than the collection,
            // so add to end of collection:
            if (position >= len - 1) {
              __data.push(data);
              __lastModifiedTime = Date.now();
              propagateData(__handle, data, doNotPropogate);
              // Otherwise insert it at the position:
            } else {
              __data.splice(position, 0, data);
              __lastModifiedTime = Date.now();
              propagateData(__handle, data, doNotPropogate);
            }
          }
          if (__autobox) {
            self.box({
              key: __key
            });
          }
        },

        // Define unique for collections.
        // Remove duplicates from view model:
        unique: function(doNotPropogate) {
          var len = __data.length;
          var ret = [];
          var obj = {};
          var self = this;

          if (this.hasData() && this.isIterable()) {
            for (var i = 0; i < len; i++) {
              var arrayItem = JSON.stringify(__data[i]);
              var arrayItemValue = __data[i];
              if (obj[arrayItem] === undefined) {
                ret.push(arrayItemValue);
                obj[arrayItem] = 1;
              } else {
                obj[arrayItem]++;
              }
            }
            __lastModifiedTime = Date.now();
            __data = ret;
          }
          if (doNotPropogate) {
            if (checkPublicationName(doNotPropogate)) {
              $.mediators[doNotPropogate].forEach(function(handle) {
                handle.callback.call(handle.callback, data);
              });
            }
          } else {
            $.dispatch(__handle, __data);
          }
          if (__autobox) {
            self.box({
              key: __key
            });
          }
        },

        // Get the index of data from a collection:
        index: function(prop, value) {
          if (this.hasData() && this.isIterable()) {
            if (value) {
              for (var i = 0; i < __data.length; i++) {
                if (__data[i][prop] === value) {
                  return i;
                }
              }
            } else {
              return __data.indexOf(prop);
            }
          }
          return;
        },

        // Filter the data of a collection:
        filter: function(args) {
          if (this.hasData() && this.isIterable()) {
            return __data.filter.apply(__data, arguments);
          }
        },

        // Map the data of a collection:
        map: function(args) {
          if (this.hasData() && this.isIterable()) {
            return __data.map.apply(__data, arguments);
          }
        },

        // Pluck the property value from a collection:
        pluck: function(property) {
          if (!property) return;
          var ret = [];
          if (this.hasData() && this.isIterable()) {
            var len = this.size();
            for (var i = 0; i < len; i++) {
              ret.push(__data[i][property]);
            }
            return ret;
          }
        },

        sort: function(args) {
          __lastModifiedTime = Date.now();
          return __data.sort.call(__data, args);
        },

        reverse: function() {
          var self = this;
          __lastModifiedTime = Date.now();
          __data.reverse();
          if (__autobox) {
            self.box({
              key: __key
            });
          }
        },

        // Sort the data of a collection:
        sortBy: function(props) {
          var orderBy = function(args) {
            var props = arguments;
            return function(a, b) {
              var sortByProperty = function(property) {
                // Default sort order:
                var sortOrder = 1;
                // If user provided property 
                // with "-" prefix, make
                // sort order descending:
                if (property[0] === "-") {
                  sortOrder = -1;
                  // Extract property from hyphen prefix:
                  property = property.substr(1);
                }
                // Sort objects by provided properties:
                //=====================================
                return function(a, b) {
                  var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                  return result * sortOrder;
                };
              };

              // Loop over all properties and sort
              // objects based on those properties:
              //===================================
              var i = 0;
              var result = 0;
              var numberOfProperties = props.length;
              while (result === 0 && i < numberOfProperties) {
                // Use the private function to compare two values:
                //================================================
                result = sortByProperty(props[i])(a, b);
                i++;
              }
              __lastModifiedTime = Date.now();
              return result;
            };
          };
          if (this.hasData() && this.isIterable()) {
            return __data.sort(orderBy.apply(null, arguments));
          }
        },

        // Enable user to delete either an object property,
        // or an index of a collection;
        delete: function(data, doNotPropogate) {
          var pos;
          if (data !== 0 && !data) return;
          var self = this;
          if (this.hasData() && this.isIterable()) {
            pos = __data.indexOf(data);
            __data.splice(pos, 1);
            __lastModifiedTime = Date.now();
          } else if (this.hasData()) {
            __lastModifiedTime = Date.now();
            delete __data[data];
          }
          propagateData(__handle, __data, doNotPropogate);
          if (__autobox) {
            self.box({
              key: __key
            });
          }
        },

        // Enable callback execution with model:
        run: function(callback) {
          callback.call(callback, this, __data);
        },

        // For the model to announce its current data state:
        poke: function() {
          if (this.hasData() && this.isIterable() && __handle) {
            $.mediators[__handle].forEach(function(handle) {
              handle.callback.call(handle.callback, data);
            });
          }
        },

        // Get the current model handle:
        getHandle: function() {
          return __handle;
        },

        // Set the handle that the model uses.
        // If a handle was set up at initialization,
        // it will be replace with this handel
        setHandle: function(handle) {
          if (handle && typeof handle === 'string') {
            __handle = handle;
          }
        },

        // Delete all data in the model:
        purge: function() {
          var self = this;
          if ($.type(__data) === 'array') {
            __data.length = 0;
          } else if ($.type(__data) === 'object') {
            for (k in __data)
              if (!(__data[k] instanceof Function)) delete __data[k];
          }
          if (__autobox) {
            self.box({
              key: __key
            });
          }
        },

        // Determine if the model has any data:
        hasData: function() {
          if ($.type(__data) === 'array' && __data.length || $.type(__data) === 'object' && !$.isEmptyObject(__data)) {
            return true;
          } else {
            return false;
          }
        },

        // Returns whether the model's data is
        // an array or an object:
        getType: function() {
          if (Array.isArray(__data)) {
            return 'array';
          } else if (typeof __data === 'object') {
            return 'object';
          } else {
            return;
          }
        },

        isIterable: function() {
          if (Array.isArray(__data)) {
            return true;
          } else {
            return false;
          }
        },

        forEach: function(callback) {
          if (this.hasData() && this.isIterable()) {
            var value;
            var i = -1;
            var len = __data.length;
            while (++i < len) {
              value = callback.call(__data[i], __data[i], i);
              if (value === false) {
                break;
              }
            }
          }
        },

        // Get all current data from model:
        getData: function() {
          if (this.hasData()) {
            return __data;
          }
        },

        // Set a value on an object property in a stack,
        // or replace the object with another:
        setItemProp: function(index, prop, value, doNotPropogate) {
          var self = this;
          if (this.hasData() && this.isIterable()) {
            if (isNaN(index)) return;
            if (!isNaN(index) && value) {
              __data[index][prop] = value;
              __lastModifiedTime = Date.now();
              propagateData(__handle, __data, doNotPropogate);
            } else if (prop && !value) {
              // __data[index][prop];
              __data.splice(index, 1, prop);
              __lastModifiedTime = Date.now();
              propagateData(__handle, __data, doNotPropogate);
            }
          } else {
            __data[index] = prop;
            __lastModifiedTime = Date.now();
            propagateData(__handle, __data, value);
          }
          if (__autobox) {
            self.box({
              key: __key
            });
          }
        },

        // Get the value of a property on an object in a stack,
        // or get the whole object at that index.
        getItemProp: function(index, prop) {
          if (this.hasData() && this.isIterable()) {
            if (isNaN(index)) return;
            if (prop) {
              return __data[index][prop];
            } else {
              return __data[index];
            }
          } else {
            return __data[index];
          }
        },

        deleteItemProp: function(index, prop, doNotPropogate) {
          var self = this;
          if (this.hasData() && this.isIterable()) {
            if (isNaN(index)) return;
            if (typeof prop === 'string') {
              __lastModifiedTime = Date.now();
              delete __data[index][prop];
              propagateData(__handle, __data, doNotPropogate);
            } else if (prop === true) {
              __lastModifiedTime = Date.now();
              __data.splice(index, 1);
              propagateData(__handle, __data, prop);
            } else {
              __lastModifiedTime = Date.now();
              __data.splice(index, 1);
              propagateData(__handle, __data, doNotPropogate);
            }
          }
          if (__autobox) {
            self.box({
              key: __key
            });
          }
        },

        getLastModTime: function() {
          return __lastModifiedTime;
        },

        box: function(options) {
          /*
            options = {
              key: key,
              boxName: name
            }
          */

          if (!options) return;
          var value;
          __autobox = options.autobox || __autobox;
          __name = options.name || $.Box.__config.name;
          __boxName = options.boxName || 'keyvaluepairs';
          __key = options.key || this.getHandle();

          // Box the model's data:
          value = this.getData();
          $.Box.set(__key, value).then(function(item) {
            __lastBoxTime = Date.now();
          });
        },

        setToAutobox: function(options) {
          __autobox = true;
          __name = options.name || $.Box.__config.name;
          __boxName = options.boxName || 'keyvaluepairs';
          __key = options.key || this.getHandle();
        },

        isBoxed: function() {
          return __lastBoxTime ? true : false;
        },

        isAutoBoxed: function() {
          return __autobox ? true : false;
        },

        getLastBoxTime: function() {
          return __lastBoxTime;
        }

      };
    }
  });
})();
// Truck Engine - View Module:
(function() {
  "use strict";
  //=============
  // Define View:
  //=============

  $.extend({

    /* jshint, evil: false, validthis:true, unused:false, smarttabs: true, nonew false */
    view: {
      index: 0
    },

    helpers: {},

    defineHelper: function(callback) {
      $.extend($.helpers, callback);
    },


    View: function(options) {
      /*
      options = {
        element: undefined,
        template: stringTemplate,
        noTemplate: false;
        model: undefined,
        variable: 'whatever',
        events: [
          {
            element: selector || 'self',
            event: 'click',
            callback: function() {}
          },
          {
            element: selector2 || 'self',
            event: 'touchstart',
            callback: function() {}
          }
        ]
      }
      */

      //====================
      // Private Properties:
      //====================
      var __element;
      if (!options) options = {};
      if (options && options.element) {
        __element = $(options.element) || $();
      }
      var $this = this;
      var __template = options.template;
      var __model = options.model;
      var __mediator = options.mediator;
      var __index = options.index || 1;
      var __rendered = false;
      var __variable = options.variable || 'data';
      var __events = options.events || [];
      var __isBoundTo = options.model;
      var __dontGetTemplate = options.noTemplate || false;
      var __startIndexFrom = options.startIndexFrom || false;
      var __canRender = true;
      var __startFrom = 0;
      var __stopAfter = 0;
      var __restartTime = 0;
      var __renderViewEveryTime = false;
      var __lastRenderTime = 0;
      var __re = /data-src/img;
      var __escapeHTML = options.escapeHTML || false;
      var __renderCount = 0;

      //===================
      // Private Functions:
      //===================

      var parsedTemplate;

      var parseView = function(template, variable) {
        var interpolate = /\{=([\s\S]+?)\}/img;
        variable = variable || 'data';
        template.replace("'", "\'");
        /* jshint ignore:start */
        var Template = new Function(variable,
          "var p=[];" + "p.push('" + template
          .replace(/[\r\t\n]/g, " ")
          .split("'").join("\\'")
          .replace(interpolate, "',$1,'")
          // Executable:
          .split('{{').join("');")
          .split('}}').join("p.push('") + "');" +
          "return p.join('');");
        return Template;
        /* jshint ignore:end */
      };

      // Binding any events provided in View options:
      var handleEvents = function() {
        if (!__element) return;
        if (__events.length) {
          __events.forEach(function(item) {
            if (item && item.element === 'self' || item && !item.element) {
              __element.on(item.event, item.callback);
            } else {
              __element.on(item.event, item.element, item.callback);
            }
          });
        }
      };

      // Get template from element:
      var extractTemplate = function() {
        if (!__element || !__element.size()) return;
        if (__dontGetTemplate) return;
        if (!__template) {
          if (__element.children()[0] && __element.children().eq(0).is('script')) {
            __template = __element.children('script').html();
            __element.empty();
          } else if (__element.children()[0] && __element.children().eq(0).is('template')) {
            __template = __element.children('template').html();
            __element.empty();
          } else if (!__element[0].childNodes) {
            return;
          } else {
            if (__element[0] && __element[0].childNodes) {
              if (!__template) __template = __element.html();
            }
            __element.empty();
          }
          if (__template) __template = __template.replace(__re, 'src');

          parseView(__template, __variable);
        } else {
          __template = __template.replace(__re, 'src');
          parseView(__template, __variable);
        }
      };
      parsedTemplate = extractTemplate();

      if (__events) {
        handleEvents(__events);
      }

      //==============================================
      // Return closure to encapsulate methods & data:
      //==============================================
      return {

        render: function(data, append) {
          if (!__element) return;
          var $this = this;
          var __data = data;

          if (__template) {
            __template = __template.replace(__re, 'src');
            parsedTemplate = parseView(__template, __variable);
          } else {
            return;
          }

          /////////////////////////////////////////////
          // Private functions for the render method.
          // These need access to the returned instance.
          /////////////////////////////////////////////

          // Uncloaks, checks index and loops data:
          var renderIterableData = function(data) {
            if ($.type(data) === 'boolean') return;
            var Data = data ? data : __model;
            __element.removeClass('cloak');
            if (__element.data('index')) {
              __index = Number(__element.data('index'));
              $.view.index = Number(__element.data('index'));
            } else {
              __index = 1;
              $.view.index = 1;
            }
            interateModelToTemplate(Data);
            __renderCount++;
          };

          // Used by renderIterableData.
          // Loops over data to render template.
          // Handles index value as well.
          var interateModelToTemplate = function(Data, append) {
            if (!append) {
              __element.empty();
            }
            if (__startIndexFrom) $.view.index = __startIndexFrom;
            Data.forEach(function(item) {
              __index += 1;
              if (__escapeHTML) {
                item = $.escapeHTML(item);
              }
              if (parsedTemplate) {
                __element.append(parsedTemplate(item));
                $.view.index += 1;
              } else if (__template) {

              }
            });
            __lastRenderTime = Date.now();
            __rendered = true;
            $.view.index = 1;
          };
          /* jshint ignore:start */
          // Render view with object of key/value pairs:
          var renderSingleObjectView = function(append) {
            __model.run(function(m, d) {
              if (!append) {
                __element.empty();
              }
              if (__escapeHTML) {
                d = $.escapeHTML(d);
              }
              __element.append(parsedTemplate(d)); // jshint ignore:line
              __element.removeClass('cloak');
              __lastRenderTime = Date.now();
              __rendered = true;
              __renderCount++;
            });
          };
          /* jshint ignore:end */

          // Biding View to Model if Model provided
          var bindModelToView = function(handle) {
            if (!handle || typeof handle !== 'string') return;
            if (!$.mediators[handle]) $.mediators[handle] = $.MediatorStack();
            $.mediators[handle].push({
              token: $.uuid(),
              callback: function() {
                $this.render();
              },
              exec: true,
              count: 0,
              start: 0,
              after: 0,
              time: 0
            });
            __mediator = $.mediators[handle];
          };

          // Check extracted template:
          if (!parsedTemplate && __template && $.type(__template) === 'string') {
            parsedTemplate = parseView(__template, __variable);
          }

          // If the user supplied data to render:
          // If it's an array:
          if ($.type(data) === 'array') {
            $.view.index = __startIndexFrom || 1;
            if (!__canRender) return;
            if (!append) {
              __element.empty();
            }
            data.forEach(function(item) {
              if (__escapeHTML) {
                item = $.escapeHTML(item);
              }
              __element.append(parsedTemplate(item)); // jshint ignore:line
              $.view.index += 1;
              __index += 1;
            });
            __rendered = true;
            $.view.index = 0;
            __element.removeClass('cloak');
            return;

            // Else if it is an object:
          } else if ($.type(data) === 'object' || $.type(data) === 'string' || $.type(data) === 'number') {
            $.view.index = __startIndexFrom || 1;
            if (!append) {
              __element.empty();
            }
            __element.append(parsedTemplate(data)); // jshint ignore:line
            __element.removeClass('cloak');
            __rendered = true;
            return;
          }

          // Check if model exists on __model.
          // Don't rendering view if no model.
          // (Model should be pokable)
          //=================================
          if (__model && Object.keys(__model).indexOf('poke') > -1) {
            if (!__canRender) {
              // Check to see if view can restart
              // after set time:
              if (__restartTime > 0) {
                if (__restartTime < Date.now()) {
                  __canRender = true;
                  __restartTime = 0;
                  bindModelToView(__model.getHandle());
                } else {
                  return;
                }
              } else {
                return;
              }
            }

            // If view was stoped with render limit,
            // check if set to stop after x times:
            if (__stopAfter > 0) {

              // If the limit not reached, render:
              if (__startFrom < __stopAfter) {
                __startFrom++;
                bindModelToView(__model.getHandle());

                // If designated count reached, stop rendering:
              } else if (__startFrom >= __stopAfter) {
                __canRender = false;
                __startFrom = 0;
                __stopAfter = 0;
              }

              // Otherwise just render the view:
            } else {
              if (__canRender) {
                bindModelToView(__model.getHandle());
              }
            }

            // If model's data is single object:
            if (__model.getType() === 'object') {
              renderSingleObjectView();

              // If model's data is an array:
            } else if (__model.getType() === 'array' && !data) {
              renderIterableData(data);
              $.view.index = 0;
              __index = 0;
            }
          }
        },

        empty: function() {
          if (!__element) return;
          __element.empty();
        },

        resetIndex: function() {
          if (!__element) return;
          __index = 0;
          __element.data('index', 0);
          $.view.index = 0;
        },

        startIndexFrom: function(number) {
          if (!__element) return;
          if (number === 0 || (number && !isNaN(number))) {
            __startIndexFrom = number;
            $.view.index = number;
            this.render();
          }
        },

        getTemplate: function() {
          return __template;
        },

        setTemplate: function(template) {
          if (!template) return;
          __template = template;
        },

        getModel: function() {
          return __model;
        },

        setModel: function(model) {
          if (!model || model === __model) return;
          __model = model;
          if (__model.size()) {
            this.render();
          }
          if (__isBoundTo) {
            this.unbind();
            this.bindToModel(model);
          }
        },

        getMediator: function() {
          return __mediator.getData()[0];
        },

        isRendered: function() {
          return __rendered;
        },

        isEmpty: function() {
          if (!__element) return;
          if (typeof jQuery === 'undefined' && /DOMStack/img.test(__element.constructor)) {
            if (__element.array[0].children.length) return false;
          } else if (__element[0].children.length) {
            return false;
          } else {
            return true;
          }
        },

        bind: function(model) {
          if (!model) return;
          var mediator = $.Mediator(model.getHandle());
          __mediator = mediator;
          var __v = this;
          __model = model;
          mediator.run(function(data) {
            if (!__element) return;
            __v.render();
          });
          if (!__element) return;
          this.render();
        },

        unbind: function() {
          __model = undefined;
        },

        addEvent: function(events, replace) {
          if (replace) {
            __events = events & events.length ? events : [events];
          } else {
            if (events && events.length) {
              events.forEach(function(event) {
                __events.push(event)
              });
            } else if (events) {
              __events.push(events);
            }
          }
          handleEvents();
        },

        /*
          options: event, element (for a delegated event), callback
        */
        off: function(event, element, callback) {
          __element.off(event, element, callback);
        },

        getElement: function() {
          return __element;
        },

        setElement: function(element) {
          if (!element) return;
          __element = $(element);
          $(element).empty();
          handleEvents();
        },

        stop: function(after) {
          // Stop after x number of times:
          if (!isNaN(after)) {
            __stopAfter = after;
            __startFrom = 0;

            // Else stop immediately:
          } else {
            __canRender = false;
          }
        },

        isStopped: function() {
          return !__canRender;
        },

        restart: function(time) {
          // Restart after designated time:
          if (!isNaN(time)) {
            __restartTime = (Date.now() + (time * 1000));
            __canRender = false;

            // Else restart immediately:
          } else {
            __canRender = true;
            this.render();
          }
        },

        getRestartTime: function() {
          return __restartTime;
        },

        renderViewAfter: function(time, data) {
          if (!time || isNaN(time) || time <= 0) return;
          var $this = this;
          setTimeout(function() {
            $this.render(data);
          }, time * 1000);
        },

        renderViewEvery: function(time, callback) {
          if (!time || isNaN(time)) return;
          if (Object.keys(__model).indexOf('poke') > -1) {

            // if the user set loop to stop:
            __renderViewEveryTime = true;
            var $this = this;

            // Define loop for rendering view:
            var loop = function($this, callback) {
              if (!__renderViewEveryTime) return;

              // Use setTimeout to loop:
              setTimeout(function() {
                // If the model changed since last render:
                if (__lastRenderTime < __model.getLastModTime()) {

                  if (callback && $.type(callback) === 'function') {
                    callback.apply($this);
                  }
                  $this.render();
                }

                loop(this, callback);
              }.bind($this), time * 1000);
            };
            loop($this, callback);
          }
        },

        // set flag to stop renderViewEvery:
        stopRenderViewEvery: function() {
          __renderViewEveryTime = false;
        },

        getLastRenderTime: function() {
          return __lastRenderTime;
        },

        escapeHTML: function(boolean) {
          if (boolean) {
            __escapeHTML = true;
          }
        },

        isEscapingHTML: function() {
          return __escapeHTML;
        },

        getRenderCount: function() {
          return __renderCount;
        }
      };
    }
  });
})();
// Truck Engine - Component Module:
(function() {
  "use strict";
  $.extend({
    Component: function(options) {
      $[options.name] = function() {
        this.options = options;
        delete this.options.name
        return $.View(this.options);
      };
    }
  });
})();
// Truck Engine - Screens Module:
(function() {
  "use strict";
  $(function() {
    //=================================
    // Interface for the app's screens:
    //=================================
    $.extend({
      screens: $('screen')
    });
    $.extend($.screens, {
      getCurrent: function() {
        return this.hazClass('current');
      },

      getNext: function() {
        return this.hazClass('next');
      },

      getPrevious: function() {
        return this.hazClass('previous');
      }
    });
  });
})();
// Truck Engine - Router Module:
(function() {
  "use strict";
  $(function() {
    $.extend({
      //===============
      // Define Router:
      //===============
      TruckRoutes: $.Model([], 'Truck-Routes'),

      Router: function() {

        $.receive('Truck-Routes', $.noop);

        return {
          addRoute: function(options) {
            if ($.type(options) === 'array') {
              options.forEach(function(item) {
                if (!$.mediators[item.route]) {
                  $.mediators[item.route] = $.MediatorStack();
                  $.mediators[item.route].push({
                    token: $.uuid(),
                    callback: item.callback,
                    exec: true,
                    count: 0
                  });
                }
              });
            }
          },

          getFullRoute: function() {
            return $.TruckRoutes.getData().join('/');
          },

          getRoutesStack: function() {
            return $.TruckRoutes.getData();
          },

          getCurrentLoc: function() {
            var temp = this.getFullRoute().split('/');
            return temp[temp.length - 1];
          },

          dispatch: function(route) {
            var temp;
            var id;
            if (route.match(/\:/)) {
              temp = route.split(':');
              id = temp[1];
              route = temp[0];
            }
            if ($.mediators[route]) {
              $.mediators[route].getData()[0].callback(id);
            }
          },

          pushRoute: function(route) {
            $.TruckRoutes.push(route);
          },

          popRoute: function() {
            return $.TruckRoutes.pop();
          },

          unshiftRoute: function(route) {
            $.TruckRoutes.unshift(route);
          },

          shiftRoute: function() {
            return $.TruckRoutes.shift();
          },

          insert: function(position, route) {
            if ($.TruckRoutes.size() >= position) {
              $.TruckRoutes.push(route);
            } else {
              $.TruckRoutes.splice(position, 0, route);
            }
          },

          eq: function(number) {
            return $.TruckRoutes.eq(number);
          },

          indexOf: function(route) {
            return $.TruckRoutes.indexOf(route);
          },

          delete: function(route, baseRouteOnly) {
            if (baseRouteOnly) {
              $.TruckRoutes.delete(route);
            } else {
              $.TruckRoutes.forEach(function(r) {
                if (r && route === r.split(':')[0]) {
                  $.TruckRoutes.delete(r);
                }
              });
            }
          }
        };
      }
    });

    $.extend($.Router, {
      dispatch: function(route) {
        if (!route) return;
        var temp;
        var id;
        if (route.match(/\:/)) {
          temp = route.split(':');
          id = temp[1];
          route = temp[0];
        }
        if ($.mediators[route]) {
          $.mediators[route].getData()[0].callback(id);
        }
      }
    });

    $.extend($.TruckRoutes, {
      getFullRoute: function() {
        return this.getData().join('/');
      }
    });

    // Set up initial route:
    if ($('screen').size()) {
      $.TruckRoutes.push($('screen')[0].id, true);
    }

  });
})();
// Truck Engine - Promises Module:
(function() {
  "use strict";
  //==================================
  // Define polyfill for ES6 Promises:
  //==================================
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
        } else if (_then = isThenable(ret)) { // jshint ignore:line
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
      var len = arr.length;
      var msgs = new Array(len);
      var count = 0;
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
// Truck Engine - Fetch Module:
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
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
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
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
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
        var base = 'callback';
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
  //==============================
  // Format Numbers for Thousands:
  //==============================
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

    //=======================
    // Return sum of numbers:
    //=======================
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

    //=================
    // Format currency:
    //=================
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

    //=============
    // Format Time:
    //=============
    formatTime: function(time) {
      var temp = time.split(':');
      var temp2 = temp[0] + ':' + temp[1];
      var ampm = time.split(' ')[1];
      return temp2 + ' ' + ampm;
    },

    sortDate: function(date1, date2) {
      return new Date(date1) - new Date(date2);
    },

    //==============
    // Sort Numbers:
    //==============
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
  //========================
  // Define data validators:
  //========================

  // Set validity state of form elements:
  var setValidityStatus = function(element, valid) {
    if (valid) {
      $(element).prop('valid', true);
      $(element).prop('invalid', false);
      $(element).addClass('valid').removeClass('invalid');
    } else {
      $(element).prop('valid', false);
      $(element).prop('invalid', true);
      $(element).addClass('invalid').removeClass('valid');
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
    },
    validateMultiSelectList: function() {
      var checkboxes = this.find('input[type=checkbox]');
      var checked = false;
      checkboxes.forEach(function(item) {
        if ($(item).prop('checked')) {
          checked = true;
        }
      });
      if (checked) {
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
      if (value) {
        return checkValidity(input, value.match(regex));
      }
    },

    customValidators: [],

    registerCustomValidator: function(name, regex) {
      this.customValidators.push({
        name: name,
        regex: regex
      });
    }
  });
})();
// Truck Engine - Box, Data Persistence Module:
(function() {
  "use strict";
  $.extend({
    Box: (function() {
      //==================
      // IndexedDB Driver:
      //==================
      (function() {
        var globalObject = this;
        var indexedDB = indexedDB || this.indexedDB || this.webkitIndexedDB || this.mozIndexedDB || this.OIndexedDB || this.msIndexedDB;
        if (!indexedDB) {
          return;
        }

        var DETECT_BLOB__support_STORE = 'truck-box-detect-blob-support';
        var supportsBlobs;
        var dbContexts;

        function __createBlob(parts, properties) {
          parts = parts || [];
          properties = properties || {};
          try {
            return new Blob(parts, properties);
          } catch (e) {
            if (e.name !== 'TypeError') {
              throw e;
            }
            var BlobBuilder = globalObject.BlobBuilder || globalObject.MSBlobBuilder || globalObject.MozBlobBuilder || globalObject.WebKitBlobBuilder;
            var builder = new BlobBuilder();
            for (var i = 0; i < parts.length; i += 1) {
              builder.append(parts[i]);
            }
            return builder.getBlob(properties.type);
          }
        }

        function __binStringToArrayBuffer(bin) {
          var length = bin.length;
          var buf = new ArrayBuffer(length);
          var arr = new Uint8Array(buf);
          for (var i = 0; i < length; i++) {
            arr[i] = bin.charCodeAt(i);
          }
          return buf;
        }

        function __blobAjax(url) {
          return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.withCredentials = true;
            xhr.responseType = 'arraybuffer';

            xhr.onreadystatechange = function() {
              if (xhr.readyState !== 4) {
                return;
              }
              if (xhr.status === 200) {
                return resolve({
                  response: xhr.response,
                  type: xhr.getResponseHeader('Content-Type')
                });
              }
              reject({
                status: xhr.status,
                response: xhr.response
              });
            };
            xhr.send();
          });
        }

        function __checkBlobSupportWithoutCaching(idb) {
          return new Promise(function(resolve, reject) {
            var blob = __createBlob([''], {
              type: 'image/png'
            });
            var txn = idb.transaction([DETECT_BLOB__support_STORE], 'readwrite');
            txn.objectStore(DETECT_BLOB__support_STORE).put(blob, 'key');
            txn.oncomplete = function() {
              var blobTxn = idb.transaction([DETECT_BLOB__support_STORE], 'readwrite');
              var getBlobReq = blobTxn.objectStore(DETECT_BLOB__support_STORE).get('key');
              getBlobReq.onerror = reject;
              getBlobReq.onsuccess = function(e) {

                var storedBlob = e.target.result;
                var url = URL.createObjectURL(storedBlob);

                __blobAjax(url).then(function(res) {
                  resolve(!!(res && res.type === 'image/png'));
                }, function() {
                  resolve(false);
                }).then(function() {
                  URL.revokeObjectURL(url);
                });
              };
            };
          })['catch'](function() {
            return false; // error, so assume unsupported
          });
        }

        function __checkBlobSupport(idb) {
          if (typeof supportsBlobs === 'boolean') {
            return Promise.resolve(supportsBlobs);
          }
          return __checkBlobSupportWithoutCaching(idb).then(function(value) {
            supportsBlobs = value;
            return supportsBlobs;
          });
        }

        function __encodeBlob(blob) {
          return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onerror = reject;
            reader.onloadend = function(e) {
              var base64 = btoa(e.target.result || '');
              resolve({
                __truck_box_encoded_blob: true,
                data: base64,
                type: blob.type
              });
            };
            reader.readAsBinaryString(blob);
          });
        }

        function __decodeBlob(encodedBlob) {
          var arrayBuff = __binStringToArrayBuffer(atob(encodedBlob.data));
          return __createBlob([arrayBuff], {
            type: encodedBlob.type
          });
        }

        function __isEncodedBlob(value) {
          return value && value.__truck_box_encoded_blob;
        }

        function __initStorage(options) {
          var self = this;
          var dbInfo = {
            db: null
          };

          if (options) {
            for (var i in options) {
              dbInfo[i] = options[i];
            }
          }

          if (!dbContexts) {
            dbContexts = {};
          }

          var dbContext = dbContexts[dbInfo.name];

          if (!dbContext) {
            dbContext = {
              box: [],
              db: null
            };
            dbContexts[dbInfo.name] = dbContext;
          }

          dbContext.box.push(this);

          var readyPromises = [];

          function ignoreErrors() {
            return Promise.resolve();
          }

          for (var j = 0; j < dbContext.box.length; j++) {
            var truckbox = dbContext.box[j];
            if (truckbox !== this) {
              readyPromises.push(truckbox.ready()['catch'](ignoreErrors));
            }
          }

          var box = dbContext.box.slice(0);
          return Promise.all(readyPromises).then(function() {
            dbInfo.db = dbContext.db;
            return __getOriginalConnection(dbInfo);
          }).then(function(db) {
            dbInfo.db = db;
            if (_isUpgradeNeeded(dbInfo, self.__defaultConfig.version)) {
              return __getUpgradedConnection(dbInfo);
            }
            return db;
          }).then(function(db) {
            dbInfo.db = dbContext.db = db;
            self.__dbInfo = dbInfo;
            for (var k in box) {
              var truckbox = box[k];
              if (truckbox !== self) {
                truckbox.__dbInfo.db = dbInfo.db;
                truckbox.__dbInfo.version = dbInfo.version;
              }
            }
          });
        }

        function __getOriginalConnection(dbInfo) {
          return __getConnection(dbInfo, false);
        }

        function __getUpgradedConnection(dbInfo) {
          return __getConnection(dbInfo, true);
        }

        function __getConnection(dbInfo, upgradeNeeded) {
          return new Promise(function(resolve, reject) {
            if (dbInfo.db) {
              if (upgradeNeeded) {
                dbInfo.db.close();
              } else {
                return resolve(dbInfo.db);
              }
            }

            var dbArgs = [dbInfo.name];

            if (upgradeNeeded) {
              dbArgs.push(dbInfo.version);
            }

            var openreq = indexedDB.open.apply(indexedDB, dbArgs);

            if (upgradeNeeded) {
              openreq.onupgradeneeded = function(e) {
                var db = openreq.result;
                try {
                  db.createObjectStore(dbInfo.boxName);
                  if (e.oldVersion <= 1) {
                    db.createObjectStore(DETECT_BLOB__support_STORE);
                  }
                } catch (ex) {
                  if (ex.name === 'ConstraintError') {
                    globalObject.console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.boxName + '" already exists.');
                  } else {
                    throw ex;
                  }
                }
              };
            }

            openreq.onerror = function() {
              reject(openreq.error);
            };

            openreq.onsuccess = function() {
              resolve(openreq.result);
            };
          });
        }

        function _isUpgradeNeeded(dbInfo, defaultVersion) {
          if (!dbInfo.db) {
            return true;
          }

          var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.boxName);
          var isDowngrade = dbInfo.version < dbInfo.db.version;
          var isUpgrade = dbInfo.version > dbInfo.db.version;

          if (isDowngrade) {
            if (dbInfo.version !== defaultVersion) {
              globalObject.console.warn('The database "' + dbInfo.name + '"' + ' can\'t be downgraded from version ' + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
            }
            dbInfo.version = dbInfo.db.version;
          }

          if (isUpgrade || isNewStore) {
            if (isNewStore) {
              var incVersion = dbInfo.db.version + 1;
              if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
              }
            }

            return true;
          }

          return false;
        }

        function get(key, callback) {
          var self = this;
          if (typeof key !== 'string') {
            globalObject.console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              var store = dbInfo.db.transaction(dbInfo.boxName, 'readonly').objectStore(dbInfo.boxName);
              var req = store.get(key);

              req.onsuccess = function() {
                var value = req.result;
                if (value === undefined) {
                  value = null;
                }
                if (__isEncodedBlob(value)) {
                  value = __decodeBlob(value);
                }
                resolve(value);
              };

              req.onerror = function() {
                reject(req.error);
              };
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function each(iterator, callback) {
          var self = this;
          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              var store = dbInfo.db.transaction(dbInfo.boxName, 'readonly').objectStore(dbInfo.boxName);

              var req = store.openCursor();
              var iterationNumber = 1;

              req.onsuccess = function() {
                var cursor = req.result;

                if (cursor) {
                  var value = cursor.value;
                  if (__isEncodedBlob(value)) {
                    value = __decodeBlob(value);
                  }
                  var result = iterator(value, cursor.key, iterationNumber++);

                  if (result !== void 0) {
                    resolve(result);
                  } else {
                    cursor['continue']();
                  }
                } else {
                  resolve();
                }
              };

              req.onerror = function() {
                reject(req.error);
              };
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function set(key, value, callback) {
          var self = this;
          if (typeof key !== 'string') {
            globalObject.console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          var promise = new Promise(function(resolve, reject) {
            var dbInfo;
            self.ready().then(function() {
              dbInfo = self.__dbInfo;
              return __checkBlobSupport(dbInfo.db);
            }).then(function(blobSupport) {
              if (!blobSupport && value instanceof Blob) {
                return __encodeBlob(value);
              }
              return value;
            }).then(function(value) {
              var transaction = dbInfo.db.transaction(dbInfo.boxName, 'readwrite');
              var store = transaction.objectStore(dbInfo.boxName);
              if (value === null) {
                value = undefined;
              }

              var req = store.put(value, key);
              transaction.oncomplete = function() {
                if (value === undefined) {
                  value = null;
                }

                resolve(value);
              };
              transaction.onabort = transaction.onerror = function() {
                var err = req.error ? req.error : req.transaction.error;
                reject(err);
              };
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function remove(key, callback) {
          var self = this;
          if (typeof key !== 'string') {
            globalObject.console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              var transaction = dbInfo.db.transaction(dbInfo.boxName, 'readwrite');
              var store = transaction.objectStore(dbInfo.boxName);
              var req = store['delete'](key);
              transaction.oncomplete = function() {
                resolve();
              };

              transaction.onerror = function() {
                reject(req.error);
              };

              transaction.onabort = function() {
                var err = req.error ? req.error : req.transaction.error;
                reject(err);
              };
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function clear(callback) {
          var self = this;
          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              var transaction = dbInfo.db.transaction(dbInfo.boxName, 'readwrite');
              var store = transaction.objectStore(dbInfo.boxName);
              var req = store.clear();

              transaction.oncomplete = function() {
                resolve();
              };

              transaction.onabort = transaction.onerror = function() {
                var err = req.error ? req.error : req.transaction.error;
                reject(err);
              };
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function size(callback) {
          var self = this;
          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              var store = dbInfo.db.transaction(dbInfo.boxName, 'readonly').objectStore(dbInfo.boxName);
              var req = store.count();

              req.onsuccess = function() {
                resolve(req.result);
              };

              req.onerror = function() {
                reject(req.error);
              };
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function key(n, callback) {
          var self = this;
          var promise = new Promise(function(resolve, reject) {
            if (n < 0) {
              resolve(null);

              return;
            }

            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              var store = dbInfo.db.transaction(dbInfo.boxName, 'readonly').objectStore(dbInfo.boxName);

              var advanced = false;
              var req = store.openCursor();
              req.onsuccess = function() {
                var cursor = req.result;
                if (!cursor) {
                  resolve(null);

                  return;
                }

                if (n === 0) {
                  resolve(cursor.key);
                } else {
                  if (!advanced) {
                    advanced = true;
                    cursor.advance(n);
                  } else {
                    resolve(cursor.key);
                  }
                }
              };

              req.onerror = function() {
                reject(req.error);
              };
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function keys(callback) {
          var self = this;
          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              var store = dbInfo.db.transaction(dbInfo.boxName, 'readonly').objectStore(dbInfo.boxName);

              var req = store.openCursor();
              var keys = [];

              req.onsuccess = function() {
                var cursor = req.result;

                if (!cursor) {
                  resolve(keys);
                  return;
                }

                keys.push(cursor.key);
                cursor['continue']();
              };

              req.onerror = function() {
                reject(req.error);
              };
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function executeCallback(promise, callback) {
          if (callback) {
            promise.then(function(result) {
              callback(null, result);
            }, function(error) {
              callback(error);
            });
          }
        }

        var asyncStorage = {
          __driver: 'asyncStorage',
          __initStorage: __initStorage,
          each: each,
          get: get,
          set: set,
          remove: remove,
          clear: clear,
          size: size,
          key: key,
          keys: keys
        };

        // Export driver:
        this.asyncStorage = asyncStorage;
        window.asyncStorage = asyncStorage;
      }).call(window);

      //===============
      // WebSQL Driver:
      //===============
      (function() {
        var globalObject = this;
        var openDatabase = this.openDatabase;
        if (!openDatabase) {
          return;
        }

        function __initStorage(options) {
          var self = this;
          var dbInfo = {
            db: null
          };

          if (options) {
            for (var i in options) {
              dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
            }
          }

          var dbInfoPromise = new Promise(function(resolve, reject) {
            try {
              dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
            } catch (e) {
              return self.setDriver(self.LOCALSTORAGE).then(function() {
                return self.__initStorage(options);
              }).then(resolve)['catch'](reject);
            }

            dbInfo.db.transaction(function(t) {
              t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.boxName + ' (id INTEGER PRIMARY KEY, key unique, value)', [], function() {
                self.__dbInfo = dbInfo;
                resolve();
              }, function(t, error) {
                reject(error);
              });
            });
          });

          return new Promise(function(resolve, reject) {
            resolve(truckBoxSerializer);
          }).then(function(lib) {
            dbInfo.serializer = lib;
            return dbInfoPromise;
          });
        }

        function get(key, callback) {
          var self = this;
          if (typeof key !== 'string') {
            globalObject.console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              dbInfo.db.transaction(function(t) {
                t.executeSql('SELECT * FROM ' + dbInfo.boxName + ' WHERE key = ? LIMIT 1', [key], function(t, results) {
                  var result = results.rows.length ? results.rows.item(0).value : null;
                  if (result) {
                    result = dbInfo.serializer.deserialize(result);
                  }

                  resolve(result);
                }, function(t, error) {

                  reject(error);
                });
              });
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function each(iterator, callback) {
          var self = this;
          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;

              dbInfo.db.transaction(function(t) {
                t.executeSql('SELECT * FROM ' + dbInfo.boxName, [], function(t, results) {
                  var rows = results.rows;
                  var length = rows.length;

                  for (var i = 0; i < length; i++) {
                    var item = rows.item(i);
                    var result = item.value;
                    if (result) {
                      result = dbInfo.serializer.deserialize(result);
                    }
                    result = iterator(result, item.key, i + 1);
                    if (result !== void 0) {
                      resolve(result);
                      return;
                    }
                  }

                  resolve();
                }, function(t, error) {
                  reject(error);
                });
              });
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function set(key, value, callback) {
          var self = this;
          if (typeof key !== 'string') {
            globalObject.console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              if (value === undefined) {
                value = null;
              }

              var originalValue = value;

              var dbInfo = self.__dbInfo;
              dbInfo.serializer.serialize(value, function(value, error) {
                if (error) {
                  reject(error);
                } else {
                  dbInfo.db.transaction(function(t) {
                    t.executeSql('INSERT OR REPLACE INTO ' + dbInfo.boxName + ' (key, value) VALUES (?, ?)', [key, value], function() {
                      resolve(originalValue);
                    }, function(t, error) {
                      reject(error);
                    });
                  }, function(sqlError) {
                    if (sqlError.code === sqlError.QUOTA_ERR) {
                      reject(sqlError);
                    }
                  });
                }
              });
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function remove(key, callback) {
          var self = this;
          if (typeof key !== 'string') {
            globalObject.console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              dbInfo.db.transaction(function(t) {
                t.executeSql('DELETE FROM ' + dbInfo.boxName + ' WHERE key = ?', [key], function() {
                  resolve();
                }, function(t, error) {

                  reject(error);
                });
              });
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function clear(callback) {
          var self = this;
          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              dbInfo.db.transaction(function(t) {
                t.executeSql('DELETE FROM ' + dbInfo.boxName, [], function() {
                  resolve();
                }, function(t, error) {
                  reject(error);
                });
              });
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function size(callback) {
          var self = this;
          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              dbInfo.db.transaction(function(t) {
                t.executeSql('SELECT COUNT(key) as c FROM ' + dbInfo.boxName, [], function(t, results) {
                  var result = results.rows.item(0).c;

                  resolve(result);
                }, function(t, error) {

                  reject(error);
                });
              });
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function key(n, callback) {
          var self = this;

          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              dbInfo.db.transaction(function(t) {
                t.executeSql('SELECT key FROM ' + dbInfo.boxName + ' WHERE id = ? LIMIT 1', [n + 1], function(t, results) {
                  var result = results.rows.length ? results.rows.item(0).key : null;
                  resolve(result);
                }, function(t, error) {
                  reject(error);
                });
              });
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function keys(callback) {
          var self = this;
          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              dbInfo.db.transaction(function(t) {
                t.executeSql('SELECT key FROM ' + dbInfo.boxName, [], function(t, results) {
                  var keys = [];

                  for (var i = 0; i < results.rows.length; i++) {
                    keys.push(results.rows.item(i).key);
                  }

                  resolve(keys);
                }, function(t, error) {

                  reject(error);
                });
              });
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function executeCallback(promise, callback) {
          if (callback) {
            promise.then(function(result) {
              callback(null, result);
            }, function(error) {
              callback(error);
            });
          }
        }

        var webSQLStorage = {
          __driver: 'webSQLStorage',
          __initStorage: __initStorage,
          each: each,
          get: get,
          set: set,
          remove: remove,
          clear: clear,
          size: size,
          key: key,
          keys: keys
        };

        // Export driver:
        this.webSQLStorage = webSQLStorage;
        window.webSQLStorage = webSQLStorage;
      }).call(window);

      //=====================
      // localStorage Driver:
      //=====================
      (function() {
        var globalObject = this;
        var localStorage = null;
        try {
          if (!this.localStorage || !('setItem' in this.localStorage)) {
            return;
          }
          localStorage = this.localStorage;
        } catch (e) {
          return;
        }

        function __initStorage(options) {
          var self = this;
          var dbInfo = {};
          if (options) {
            for (var i in options) {
              dbInfo[i] = options[i];
            }
          }

          dbInfo.keyPrefix = dbInfo.name + '/';

          if (dbInfo.boxName !== self.__defaultConfig.boxName) {
            dbInfo.keyPrefix += dbInfo.boxName + '/';
          }

          self.__dbInfo = dbInfo;

          return new Promise(function(resolve, reject) {
            resolve(truckBoxSerializer);
          }).then(function(lib) {
            dbInfo.serializer = lib;
            return Promise.resolve();
          });
        }

        function clear(callback) {
          var self = this;
          var promise = self.ready().then(function() {
            var keyPrefix = self.__dbInfo.keyPrefix;

            for (var i = localStorage.length - 1; i >= 0; i--) {
              var key = localStorage.key(i);

              if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
              }
            }
          });

          executeCallback(promise, callback);
          return promise;
        }

        function get(key, callback) {
          var self = this;
          if (typeof key !== 'string') {
            globalObject.console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          var promise = self.ready().then(function() {
            var dbInfo = self.__dbInfo;
            var result = localStorage.getItem(dbInfo.keyPrefix + key);
            if (result) {
              result = dbInfo.serializer.deserialize(result);
            }

            return result;
          });

          executeCallback(promise, callback);
          return promise;
        }

        function each(iterator, callback) {
          var self = this;

          var promise = self.ready().then(function() {
            var dbInfo = self.__dbInfo;
            var keyPrefix = dbInfo.keyPrefix;
            var keyPrefixLength = keyPrefix.length;
            var length = localStorage.length;
            var iterationNumber = 1;

            for (var i = 0; i < length; i++) {
              var key = localStorage.key(i);
              if (key.indexOf(keyPrefix) !== 0) {
                continue;
              }
              var value = localStorage.getItem(key);
              if (value) {
                value = dbInfo.serializer.deserialize(value);
              }

              value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);
              if (value !== void 0) {
                return value;
              }
            }
          });

          executeCallback(promise, callback);
          return promise;
        }

        function key(n, callback) {
          var self = this;
          var promise = self.ready().then(function() {
            var dbInfo = self.__dbInfo;
            var result;
            try {
              result = localStorage.key(n);
            } catch (error) {
              result = null;
            }

            if (result) {
              result = result.substring(dbInfo.keyPrefix.length);
            }

            return result;
          });

          executeCallback(promise, callback);
          return promise;
        }

        function keys(callback) {
          var self = this;
          var promise = self.ready().then(function() {
            var dbInfo = self.__dbInfo;
            var length = localStorage.length;
            var keys = [];

            for (var i = 0; i < length; i++) {
              if (localStorage.key(i).indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(localStorage.key(i).substring(dbInfo.keyPrefix.length));
              }
            }
            return keys;
          });

          executeCallback(promise, callback);
          return promise;
        }

        function size(callback) {
          var self = this;
          var promise = self.keys().then(function(keys) {
            return keys.length;
          });

          executeCallback(promise, callback);
          return promise;
        }

        function remove(key, callback) {
          var self = this;
          if (typeof key !== 'string') {
            globalObject.console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          var promise = self.ready().then(function() {
            var dbInfo = self.__dbInfo;
            localStorage.removeItem(dbInfo.keyPrefix + key);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function set(key, value, callback) {
          var self = this;
          if (typeof key !== 'string') {
            globalObject.console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          var promise = self.ready().then(function() {
            if (value === undefined) {
              value = null;
            }
            var originalValue = value;

            return new Promise(function(resolve, reject) {
              var dbInfo = self.__dbInfo;
              dbInfo.serializer.serialize(value, function(value, error) {
                if (error) {
                  reject(error);
                } else {
                  try {
                    localStorage.setItem(dbInfo.keyPrefix + key, value);
                    resolve(originalValue);
                  } catch (e) {
                    if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                      reject(e);
                    }
                    reject(e);
                  }
                }
              });
            });
          });

          executeCallback(promise, callback);
          return promise;
        }

        function executeCallback(promise, callback) {
          if (callback) {
            promise.then(function(result) {
              callback(null, result);
            }, function(error) {
              callback(error);
            });
          }
        }

        var localStorageWrapper = {
          __driver: 'localStorageWrapper',
          __initStorage: __initStorage,
          each: each,
          get: get,
          set: set,
          remove: remove,
          clear: clear,
          size: size,
          key: key,
          keys: keys
        };

        // Export driver:
        this.localStorageWrapper = localStorageWrapper;
        window.localStorageWrapper = localStorageWrapper;
      }).call(window);

      //=================
      // Blob Serializer:
      //=================
      (function() {
        var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

        var BLOB_TYPE_PREFIX = '~~truck_box_type~';
        var BLOB_TYPE_PREFIX_REGEX = /^~~truck_box_type~([^~]+)~/;
        var SERIALIZED_MARKER = '__lfsc__:';
        var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
        var TYPE_ARRAYBUFFER = 'arbf';
        var TYPE_BLOB = 'blob';
        var TYPE_INT8ARRAY = 'si08';
        var TYPE_UINT8ARRAY = 'ui08';
        var TYPE_UINT8CLAMPEDARRAY = 'uic8';
        var TYPE_INT16ARRAY = 'si16';
        var TYPE_INT32ARRAY = 'si32';
        var TYPE_UINT16ARRAY = 'ur16';
        var TYPE_UINT32ARRAY = 'ui32';
        var TYPE_FLOAT32ARRAY = 'fl32';
        var TYPE_FLOAT64ARRAY = 'fl64';
        var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
        var globalObject = this;

        function __createBlob(parts, properties) {
          parts = parts || [];
          properties = properties || {};

          try {
            return new Blob(parts, properties);
          } catch (err) {
            if (err.name !== 'TypeError') {
              throw err;
            }

            var BlobBuilder = globalObject.BlobBuilder || globalObject.MSBlobBuilder || globalObject.MozBlobBuilder || globalObject.WebKitBlobBuilder;

            var builder = new BlobBuilder();
            for (var i = 0; i < parts.length; i += 1) {
              builder.append(parts[i]);
            }

            return builder.getBlob(properties.type);
          }
        }

        function serialize(value, callback) {
          var valueString = '';
          if (value) {
            valueString = value.toString();
          }

          if (value && (value.toString() === '[object ArrayBuffer]' || value.buffer && value.buffer.toString() === '[object ArrayBuffer]')) {
            var buffer;
            var marker = SERIALIZED_MARKER;

            if (value instanceof ArrayBuffer) {
              buffer = value;
              marker += TYPE_ARRAYBUFFER;
            } else {
              buffer = value.buffer;

              if (valueString === '[object Int8Array]') {
                marker += TYPE_INT8ARRAY;
              } else if (valueString === '[object Uint8Array]') {
                marker += TYPE_UINT8ARRAY;
              } else if (valueString === '[object Uint8ClampedArray]') {
                marker += TYPE_UINT8CLAMPEDARRAY;
              } else if (valueString === '[object Int16Array]') {
                marker += TYPE_INT16ARRAY;
              } else if (valueString === '[object Uint16Array]') {
                marker += TYPE_UINT16ARRAY;
              } else if (valueString === '[object Int32Array]') {
                marker += TYPE_INT32ARRAY;
              } else if (valueString === '[object Uint32Array]') {
                marker += TYPE_UINT32ARRAY;
              } else if (valueString === '[object Float32Array]') {
                marker += TYPE_FLOAT32ARRAY;
              } else if (valueString === '[object Float64Array]') {
                marker += TYPE_FLOAT64ARRAY;
              } else {
                callback(new Error('Failed to get type for BinaryArray'));
              }
            }

            callback(marker + bufferToString(buffer));
          } else if (valueString === '[object Blob]') {
            var fileReader = new FileReader();

            fileReader.onload = function() {
              var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);
              callback(SERIALIZED_MARKER + TYPE_BLOB + str);
            };

            fileReader.readAsArrayBuffer(value);
          } else {
            try {
              callback(JSON.stringify(value));
            } catch (e) {
              console.error("Couldn't convert value into a JSON string: ", value);

              callback(null, e);
            }
          }
        }

        function deserialize(value) {
          if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
            return JSON.parse(value);
          }
          var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
          var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
          var blobType;
          if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
            var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
            blobType = matcher[1];
            serializedString = serializedString.substring(matcher[0].length);
          }
          var buffer = stringToBuffer(serializedString);

          switch (type) {
            case TYPE_ARRAYBUFFER:
              return buffer;
            case TYPE_BLOB:
              return __createBlob([buffer], {
                type: blobType
              });
            case TYPE_INT8ARRAY:
              return new Int8Array(buffer);
            case TYPE_UINT8ARRAY:
              return new Uint8Array(buffer);
            case TYPE_UINT8CLAMPEDARRAY:
              return new Uint8ClampedArray(buffer);
            case TYPE_INT16ARRAY:
              return new Int16Array(buffer);
            case TYPE_UINT16ARRAY:
              return new Uint16Array(buffer);
            case TYPE_INT32ARRAY:
              return new Int32Array(buffer);
            case TYPE_UINT32ARRAY:
              return new Uint32Array(buffer);
            case TYPE_FLOAT32ARRAY:
              return new Float32Array(buffer);
            case TYPE_FLOAT64ARRAY:
              return new Float64Array(buffer);
            default:
              throw new Error('Unkown type: ' + type);
          }
        }

        function stringToBuffer(serializedString) {
          var bufferLength = serializedString.length * 0.75;
          var len = serializedString.length;
          var i;
          var p = 0;
          var encoded1, encoded2, encoded3, encoded4;
          if (serializedString[serializedString.length - 1] === '=') {
            bufferLength--;
            if (serializedString[serializedString.length - 2] === '=') {
              bufferLength--;
            }
          }
          var buffer = new ArrayBuffer(bufferLength);
          var bytes = new Uint8Array(buffer);

          for (i = 0; i < len; i += 4) {
            encoded1 = BASE_CHARS.indexOf(serializedString[i]);
            encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
            encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
            encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

            /*jslint bitwise: true */
            bytes[p++] = encoded1 << 2 | encoded2 >> 4;
            bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
            bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
          }
          return buffer;
        }

        function bufferToString(buffer) {
          var bytes = new Uint8Array(buffer);
          var base64String = '';
          var i;

          for (i = 0; i < bytes.length; i += 3) {
            /*jslint bitwise: true */
            base64String += BASE_CHARS[bytes[i] >> 2];
            base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
            base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
            base64String += BASE_CHARS[bytes[i + 2] & 63];
          }
          if (bytes.length % 3 === 2) {
            base64String = base64String.substring(0, base64String.length - 1) + '=';
          } else if (bytes.length % 3 === 1) {
            base64String = base64String.substring(0, base64String.length - 2) + '==';
          }
          return base64String;
        }

        var truckBoxSerializer = {
          serialize: serialize,
          deserialize: deserialize,
          stringToBuffer: stringToBuffer,
          bufferToString: bufferToString
        };

        // Export driver:
        this.truckBoxSerializer = truckBoxSerializer;
        window.truckBoxSerializer = truckBoxSerializer;
      }).call(window);

      //==========================
      // Truck Box Implementation:
      //==========================
      var CustomDrivers = {};
      var DriverType = {
        INDEXEDDB: 'asyncStorage',
        LOCALSTORAGE: 'localStorageWrapper',
        WEBSQL: 'webSQLStorage'
      };
      var DefaultDriverOrder = [DriverType.INDEXEDDB, DriverType.WEBSQL, DriverType.LOCALSTORAGE];
      var LibraryMethods = ['clear', 'get', 'each', 'key', 'keys', 'size', 'remove', 'set'];

      var DefaultConfig = {
        description: '',
        driver: DefaultDriverOrder.slice(),
        name: 'truckbox',
        size: 4980736,
        boxName: 'keyvaluepairs',
        version: 1.0
      };

      var driverSupport = (function(self) {
        var indexedDB = indexedDB || self.indexedDB || self.webkitIndexedDB || self.mozIndexedDB || self.OIndexedDB || self.msIndexedDB;
        var result = {};
        result[DriverType.WEBSQL] = !!self.openDatabase;
        result[DriverType.INDEXEDDB] = !!(function() {
          if (typeof self.openDatabase !== 'undefined' && self.navigator && self.navigator.userAgent && /Safari/.test(self.navigator.userAgent) && !/Chrome/.test(self.navigator.userAgent)) {
            return false;
          }
          try {
            return indexedDB && typeof indexedDB.open === 'function' &&
              typeof self.IDBKeyRange !== 'undefined';
          } catch (e) {
            return false;
          }
        })();

        result[DriverType.LOCALSTORAGE] = !!(function() {
          try {
            return self.localStorage && 'setItem' in self.localStorage && self.localStorage.setItem;
          } catch (e) {
            return false;
          }
        })();

        return result;
      })(window);

      var isArray = Array.isArray || function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
      };

      function callWhenReady(truckBoxInstance, libraryMethod) {
        truckBoxInstance[libraryMethod] = function() {
          var __args = arguments;
          return truckBoxInstance.ready().then(function() {
            return truckBoxInstance[libraryMethod].apply(truckBoxInstance, __args);
          });
        };
      }

      function extend() {
        for (var i = 1; i < arguments.length; i++) {
          var arg = arguments[i];

          if (arg) {
            for (var key in arg) {
              if (arg.hasOwnProperty(key)) {
                if (isArray(arg[key])) {
                  arguments[0][key] = arg[key].slice();
                } else {
                  arguments[0][key] = arg[key];
                }
              }
            }
          }
        }

        return arguments[0];
      }

      function isLibraryDriver(driverName) {
        for (var driver in DriverType) {
          if (DriverType.hasOwnProperty(driver) && DriverType[driver] === driverName) {
            return true;
          }
        }

        return false;
      }

      var TruckBox = (function() {
        function TruckBox(options) {

          this.INDEXEDDB = DriverType.INDEXEDDB;
          this.LOCALSTORAGE = DriverType.LOCALSTORAGE;
          this.WEBSQL = DriverType.WEBSQL;

          this.__defaultConfig = extend({}, DefaultConfig);
          this.__config = extend({}, this.__defaultConfig, options);
          this.__driverSet = null;
          this.__initDriver = null;
          this.__ready = false;
          this.__dbInfo = null;

          this.__wrapLibraryMethodsWithReady();
          this.setDriver(this.__config.driver);
        }

        TruckBox.prototype.config = function(options) {
          if (typeof options === 'object') {
            if (this.__ready) {
              return new Error("Can't call config() after truckbox " + 'has been used.');
            }
            for (var i in options) {
              if (i === 'boxName') {
                options[i] = options[i].replace(/\W/g, '_');
              }

              this.__config[i] = options[i];
            }
            if ('driver' in options && options.driver) {
              this.setDriver(this.__config.driver);
            }

            return true;
          } else if (typeof options === 'string') {
            return this.__config[options];
          } else {
            return this.__config;
          }
        };

        TruckBox.prototype.defineDriver = function(driverObject, callback, errorCallback) {
          var promise = new Promise(function(resolve, reject) {
            try {
              var driverName = driverObject.__driver;
              var complianceError = new Error('Custom driver not compliant; see Truck Box documentation');
              var namingError = new Error('Custom driver name already in use: ' + driverObject.__driver);
              if (!driverObject.__driver) {
                reject(complianceError);
                return;
              }
              if (isLibraryDriver(driverObject.__driver)) {
                reject(namingError);
                return;
              }

              var customDriverMethods = LibraryMethods.concat('__initStorage');
              for (var i = 0; i < customDriverMethods.length; i++) {
                var customDriverMethod = customDriverMethods[i];
                if (!customDriverMethod || !driverObject[customDriverMethod] || typeof driverObject[customDriverMethod] !== 'function') {
                  reject(complianceError);
                  return;
                }
              }

              var supportPromise = Promise.resolve(true);
              if ('__support' in driverObject) {
                if (driverObject.__support && typeof driverObject.__support === 'function') {
                  supportPromise = driverObject.__support();
                } else {
                  supportPromise = Promise.resolve(!!driverObject.__support);
                }
              }

              supportPromise.then(function(supportResult) {
                driverSupport[driverName] = supportResult;
                CustomDrivers[driverName] = driverObject;
                resolve();
              }, reject);
            } catch (e) {
              reject(e);
            }
          });

          promise.then(callback, errorCallback);
          return promise;
        };

        TruckBox.prototype.driver = function() {
          return this.__driver || null;
        };

        TruckBox.prototype.getDriver = function(driverName, callback, errorCallback) {
          var self = this;
          var getDriverPromise = (function() {
            if (isLibraryDriver(driverName)) {
              switch (driverName) {
                case self.INDEXEDDB:
                  return new Promise(function(resolve, reject) {
                    resolve(asyncStorage);
                  });
                case self.LOCALSTORAGE:
                  return new Promise(function(resolve, reject) {
                    resolve(localStorageWrapper);
                  });
                case self.WEBSQL:
                  return new Promise(function(resolve, reject) {
                    resolve(webSQLStorage);
                  });
              }
            } else if (CustomDrivers[driverName]) {
              console.log('Using: ' + driverName)
              return Promise.resolve(CustomDrivers[driverName]);
            }

            return Promise.reject(new Error('Driver not found.'));
          })();

          getDriverPromise.then(callback, errorCallback);
          return getDriverPromise;
        };

        TruckBox.prototype.getSerializer = function(callback) {
          var serializerPromise = new Promise(function(resolve, reject) {
            resolve(truckBoxSerializer)
          });
          if (callback && typeof callback === 'function') {
            serializerPromise.then(function(result) {
              callback(result);
            });
          }
          return serializerPromise;
        };

        TruckBox.prototype.ready = function(callback) {
          var self = this;

          var promise = self.__driverSet.then(function() {
            if (self.__ready === null) {
              self.__ready = self.__initDriver();
            }

            return self.__ready;
          });

          promise.then(callback, callback);
          return promise;
        };

        TruckBox.prototype.setDriver = function(drivers, callback, errorCallback) {
          var self = this;

          if (!isArray(drivers)) {
            drivers = [drivers];
          }

          var supportedDrivers = this.__getSupportedDrivers(drivers);

          function setDriverToConfig() {
            self.__config.driver = self.driver();
          }

          function initDriver(supportedDrivers) {
            return function() {
              var currentDriverIndex = 0;

              function driverPromiseLoop() {
                while (currentDriverIndex < supportedDrivers.length) {
                  var driverName = supportedDrivers[currentDriverIndex];
                  currentDriverIndex++;

                  self.__dbInfo = null;
                  self.__ready = null;

                  return self.getDriver(driverName).then(function(driver) {
                    self.__extend(driver);
                    setDriverToConfig();

                    self.__ready = self.__initStorage(self.__config);
                    return self.__ready;
                  })['catch'](driverPromiseLoop);
                }

                setDriverToConfig();
                var error = new Error('No available storage method found.');
                self.__driverSet = Promise.reject(error);
                return self.__driverSet;
              }

              return driverPromiseLoop();
            };
          }

          var oldDriverSetDone = this.__driverSet !== null ? this.__driverSet['catch'](function() {
            return Promise.resolve();
          }) : Promise.resolve();

          this.__driverSet = oldDriverSetDone.then(function() {
            var driverName = supportedDrivers[0];
            self.__dbInfo = null;
            self.__ready = null;

            return self.getDriver(driverName).then(function(driver) {
              self.__driver = driver.__driver;
              setDriverToConfig();
              self.__wrapLibraryMethodsWithReady();
              self.__initDriver = initDriver(supportedDrivers);
            });
          })['catch'](function() {
            setDriverToConfig();
            var error = new Error('No available storage method found.');
            self.__driverSet = Promise.reject(error);
            return self.__driverSet;
          });

          this.__driverSet.then(callback, errorCallback);
          return this.__driverSet;
        };

        TruckBox.prototype.supports = function(driverName) {
          return !!driverSupport[driverName];
        };

        TruckBox.prototype.__extend = function(libraryMethodsAndProperties) {
          extend(this, libraryMethodsAndProperties);
        };

        TruckBox.prototype.__getSupportedDrivers = function(drivers) {
          var supportedDrivers = [];
          for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];
            if (this.supports(driverName)) {
              supportedDrivers.push(driverName);
            }
          }
          return supportedDrivers;
        };

        TruckBox.prototype.__wrapLibraryMethodsWithReady = function() {
          for (var i = 0; i < LibraryMethods.length; i++) {
            callWhenReady(this, LibraryMethods[i]);
          }
        };

        TruckBox.prototype.createInstance = function(options) {
          return new TruckBox(options);
        };

        return TruckBox;
      })();

      var truckBox = new TruckBox();
      return truckBox;
    })()
  });
})();

// Truck Engine - Driver for sessionStorage:
(function() {
  'use strict';
  var globalObject = this;
  var serializer = null;
  var sessionStorage = null;

  function getSupport() {
    try {
      if (globalObject.sessionStorage && ('setItem' in globalObject.sessionStorage)) {
        return true;
      }
    } catch (e) {}
    return false;
  }
  if (getSupport()) {
    sessionStorage = this.sessionStorage;
  } else {
    return;
  }

  function __initStorage(options) {
    var self = this;
    var dbInfo = {};
    if (options) {
      for (var i in options) {
        dbInfo[i] = options[i];
      }
    }

    dbInfo.keyPrefix = dbInfo.name + '/';
    self.__dbInfo = dbInfo;

    var serializerPromise = new Promise(function(resolve, reject) {
      if (typeof self.getSerializer === 'function') {
        self.getSerializer().then(resolve, reject);
        return;
      }
      resolve(globalObject.truckBoxSerializer);
    });

    return serializerPromise.then(function(lib) {
      serializer = lib;
      return Promise.resolve();
    });
  }

  function clear(callback) {
    var self = this;
    var promise = self.ready().then(function() {
      var keyPrefix = self.__dbInfo.keyPrefix;
      for (var i = sessionStorage.length - 1; i >= 0; i--) {
        var key = sessionStorage.key(i);
        if (key.indexOf(keyPrefix) === 0) {
          sessionStorage.removeItem(key);
        }
      }
    });
    executeCallback(promise, callback);
    return promise;
  }

  function get(key, callback) {
    var self = this;
    if (typeof key !== 'string') {
      window.console.warn(key + ' used as a key, but it is not a string.');
      key = String(key);
    }

    var promise = self.ready().then(function() {
      var dbInfo = self.__dbInfo;
      var result = sessionStorage.getItem(dbInfo.keyPrefix + key);
      if (result) {
        result = serializer.deserialize(result);
      }
      return result;
    });

    executeCallback(promise, callback);
    return promise;
  }

  function each(iterator, callback) {
    var self = this;
    var promise = self.ready().then(function() {
      var keyPrefix = self.__dbInfo.keyPrefix;
      var keyPrefixLength = keyPrefix.length;
      var length = sessionStorage.length;
      for (var i = 0; i < length; i++) {
        var key = sessionStorage.key(i);
        var value = sessionStorage.getItem(key);
        if (value) {
          value = serializer.deserialize(value);
        }
        value = iterator(value, key.substring(keyPrefixLength), i + 1);
        if (value !== void(0)) {
          return value;
        }
      }
    });

    executeCallback(promise, callback);
    return promise;
  }

  function key(n, callback) {
    var self = this;
    var promise = self.ready().then(function() {
      var dbInfo = self.__dbInfo;
      var result;
      try {
        result = sessionStorage.key(n);
      } catch (error) {
        result = null;
      }
      if (result) {
        result = result.substring(dbInfo.keyPrefix.length);
      }
      return result;
    });
    executeCallback(promise, callback);
    return promise;
  }

  function keys(callback) {
    var self = this;
    var promise = self.ready().then(function() {
      var dbInfo = self.__dbInfo;
      var length = sessionStorage.length;
      var keys = [];
      for (var i = 0; i < length; i++) {
        if (sessionStorage.key(i).indexOf(dbInfo.keyPrefix) === 0) {
          keys.push(sessionStorage.key(i).substring(dbInfo.keyPrefix.length));
        }
      }
      return keys;
    });

    executeCallback(promise, callback);
    return promise;
  }

  function size(callback) {
    var self = this;
    var promise = self.keys().then(function(keys) {
      return keys.length;
    });
    executeCallback(promise, callback);
    return promise;
  }

  function remove(key, callback) {
    var self = this;
    if (typeof key !== 'string') {
      window.console.warn(key + ' used as a key, but it is not a string.');
      key = String(key);
    }

    var promise = self.ready().then(function() {
      var dbInfo = self.__dbInfo;
      sessionStorage.removeItem(dbInfo.keyPrefix + key);
    });
    executeCallback(promise, callback);
    return promise;
  }

  function set(key, value, callback) {
    var self = this;
    if (typeof key !== 'string') {
      window.console.warn(key + ' used as a key, but it is not a string.');
      key = String(key);
    }

    var promise = self.ready().then(function() {
      if (value === undefined) {
        value = null;
      }
      var originalValue = value;
      return new Promise(function(resolve, reject) {
        serializer.serialize(value, function(value, error) {
          if (error) {
            reject(error);
          } else {
            try {
              var dbInfo = self.__dbInfo;
              sessionStorage.setItem(dbInfo.keyPrefix + key, value);
              resolve(originalValue);
            } catch (e) {
              if (e.name === 'QuotaExceededError' ||
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                reject(e);
              }
              reject(e);
            }
          }
        });
      });
    });
    executeCallback(promise, callback);
    return promise;
  }

  function executeCallback(promise, callback) {
    if (callback) {
      promise.then(function(result) {
        callback(null, result);
      }, function(error) {
        callback(error);
      });
    }
  }

  var sessionStorageDriver = {
    __driver: 'sessionStorageDriver',
    __initStorage: __initStorage,
    __support: function() {
      return new Promise(function(resolve) {
        resolve(getSupport());
      });
    },
    each: each,
    get: get,
    set: set,
    remove: remove,
    clear: clear,
    size: size,
    key: key,
    keys: keys
  };
  // Export driver:
  this.sessionStorageDriver = sessionStorageDriver;
  window.sessionStorageDriver = sessionStorageDriver;
}).call(window);
// Truck Engine - Animation Module:
/* Inspired by Chuck Holloway's Move.JS */
(function(self) {
  $(function() {
    function transformProperty() {
      var styles = [
        'webkitTransform',
        'MozTransform',
        'msTransform',
        'transform'
      ];

      var el = document.createElement('p');
      var style;
      var ret;
      for (var i = 0; i < styles.length; i++) {
        style = styles[i];
        if (null !== el.style[style]) {
          ret = style;
          break;
        }
      }
      return ret;
    }

    function hasTranslate3d() {
      var prop = transformProperty();
      var map = {
        webkitTransform: '-webkit-transform',
        msTransform: '-ms-transform',
        MozTransform: '-moz-transform',
        transform: 'transform'
      };

      var el = document.createElement('div');
      el.style[prop] = 'translate3d(1px,1px,1px)';
      document.body.insertBefore(el, null);
      var val = getComputedStyle(el).getPropertyValue(map[prop]);
      document.body.removeChild(el);
      return null !== val && val.length && 'none' != val;
    }

    function hasTransitions() {
      var styl = document.body.style;
      return 'transition' in styl || 'webkitTransition' in styl || 'MozTransition' in styl || 'msTransition' in styl;
    }

    function componentEvents() {
      var bind = 'addEventListener';
      var unbind = 'removeEventListener';
      var prefix = bind !== 'addEventListener' ? 'on' : '';

      return {
        bind: function(el, type, fn, capture) {
          el[bind](prefix + type, fn, capture || false);
          return fn;
        },

        unbind: function(el, type, fn, capture) {
          el[unbind](prefix + type, fn, capture || false);
          return fn;
        }
      }
    }

    function cssEmitter() {

      var events = componentEvents();

      // CSS events:

      var watch = [
        'transitionend', 'webkitTransitionEnd', 'MSTransitionEnd', 'animationend', 'webkitAnimationEnd', 'MSAnimationEnd'
      ];

      function CssEmitter(element) {
        if (!(this instanceof CssEmitter)) return new CssEmitter(element);
        this.el = element;
      }

      CssEmitter.prototype.bind = function(fn) {
        for (var i = 0; i < watch.length; i++) {
          events.bind(this.el, watch[i], fn);
        }
        return this;
      };

      CssEmitter.prototype.unbind = function(fn) {
        for (var i = 0; i < watch.length; i++) {
          events.unbind(this.el, watch[i], fn);
        }
        return this;
      };

      CssEmitter.prototype.once = function(fn) {
        var self = this;

        function on() {
          self.unbind(on);
          fn.apply(self.el, arguments);
        }
        self.bind(on);
        return this;
      };

      return CssEmitter;
    }

    function yieldsAafterTransition() {
      var has = hasTransitions;
      var emitter = cssEmitter();
      var supported = has();
      var n = 0;
      var global = (function() {
        return this;
      })();
      var once = function(fn) {
        var id = n++;

        function once() {
          // no receiver
          if (this == global) {
            if (once.called) return;
            once.called = true;
            return fn.apply(this, arguments);
          }

          // receiver
          var key = '__called_' + id + '__';
          if (this[key]) return;
          this[key] = true;
          return fn.apply(this, arguments);
        }

        return once;
      }

      function after(el, fn) {
        if (!supported || !has(el)) return fn();
        emitter(el).bind(fn);
        return fn;
      }
      after.once = function(el, fn) {
        var callback = once(fn);
        after(el, fn = function() {
          emitter(el).unbind(fn);
          callback();
        });
      };
      return after
    }

    function emitter() {
      function Emitter(obj) {
        if (obj) return mixin(obj);
      }

      function mixin(obj) {
        for (var key in Emitter.prototype) {
          obj[key] = Emitter.prototype[key];
        }
        return obj;
      }

      Emitter.prototype.on =
        Emitter.prototype.addEventListener = function(event, fn) {
          this._callbacks = this._callbacks || {};
          (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
          .push(fn);
          return this;
        };

      Emitter.prototype.once = function(event, fn) {
        function on() {
          this.off(event, on);
          fn.apply(this, arguments);
        }

        on.fn = fn;
        this.on(event, on);
        return this;
      };

      Emitter.prototype.off =
        Emitter.prototype.removeListener =
        Emitter.prototype.removeAllListeners =
        Emitter.prototype.removeEventListener = function(event, fn) {
          this._callbacks = this._callbacks || {};

          // all:
          if (0 === arguments.length) {
            this._callbacks = {};
            return this;
          }

          // specific event:
          var callbacks = this._callbacks['$' + event];
          if (!callbacks) return this;

          // remove all handlers:
          if (1 == arguments.length) {
            delete this._callbacks['$' + event];
            return this;
          }

          // remove specific handler:
          var cb;
          for (var i = 0; i < callbacks.length; i++) {
            cb = callbacks[i];
            if (cb === fn || cb.fn === fn) {
              callbacks.splice(i, 1);
              break;
            }
          }
          return this;
        };

      Emitter.prototype.emit = function(event) {
        this._callbacks = this._callbacks || {};
        var args = [].slice.call(arguments, 1),
          callbacks = this._callbacks['$' + event];

        if (callbacks) {
          callbacks = callbacks.slice(0);
          for (var i = 0, len = callbacks.length; i < len; ++i) {
            callbacks[i].apply(this, args);
          }
        }

        return this;
      };

      Emitter.prototype.listeners = function(event) {
        this._callbacks = this._callbacks || {};
        return this._callbacks['$' + event] || [];
      };

      Emitter.prototype.hasListeners = function(event) {
        return !!this.listeners(event).length;
      };
      return Emitter;
    }

    function cssEase() {
      return {
        'in': 'ease-in',
        'out': 'ease-out',
        'in-out': 'ease-in-out',
        'snap': 'cubic-bezier(0,1,.5,1)',
        'linear': 'cubic-bezier(0.250, 0.250, 0.750, 0.750)',

        'ease-in-quad': 'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
        'ease-out-quad': 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
        'ease-in-out-quad': 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',

        'ease-in-cubic': 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
        'ease-out-cubic': 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
        'ease-in-out-cubic': 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',

        'ease-in-quart': 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
        'ease-out-quart': 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
        'ease-in-out-quart': 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',

        'ease-in-quint': 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
        'ease-out-quint': 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
        'ease-in-out-quint': 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',

        'ease-in-sine': 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
        'ease-out-sine': 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
        'ease-in-out-sine': 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',

        'ease-in-expo': 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
        'ease-out-expo': 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
        'ease-in-out-expo': 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',
        'ease-out-in-back': 'cubic-bezier(0,1,1,0)',

        'ease-in-circ': 'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
        'ease-out-circ': 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
        'ease-in-out-circ': 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',
        'ease-out-in-circ': 'cubic-bezier((0.135, 0.885, 0.860, 0.140)',

        'ease-in-back': 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
        'ease-out-back': 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
        'ease-in-out-back': 'cubic-bezier(0.680, -0.550, 0.265, 1.550)'
      };
    }

    $.extend({
      anim: (function() {

        var Emitter = emitter();

        var query = function(selector) {
          return document.querySelector(selector);
        };

        var after = yieldsAafterTransition();
        var has3d = hasTranslate3d();
        var ease = cssEase();
        var translate = has3d ? ['translate3d(', ', 0)'] : ['translate(', ')'];
        // module.exports = Anim;
        var style = window.getComputedStyle || window.currentStyle;

        // Initialize a new Anim with the given element:
        function Anim(el) {
          if (!(this instanceof Anim)) return new Anim(el);
          if ('string' == typeof el) el = query(el);
          if (!el) throw new TypeError('Anim must be initialized with element or selector');
          this.el = el;
          this._props = {};
          this._rotate = 0;
          this._transitionProps = [];
          this._transforms = [];
          this.duration(Anim.defaults.duration);
          requestAnimationFrame(Anim)
        }
        Anim.ease = ease;

        Anim.defaults = {
          duration: 500
        };

        // Default element selection used by anim(selector):
        Anim.select = function(selector) {
          return $(selector)[0];
        };

        // Inherit from EventEmitter.prototype:
        Emitter(Anim.prototype);

        // Buffer transform:
        Anim.prototype.transform = function(transform) {
          this._transforms.push(transform);
          return this;
        };

        // Skew x and y:
        Anim.prototype.skew = function(x, y) {
          return this.transform('skew(' + x + 'deg, ' + (y || 0) + 'deg)');
        };

        // Skew x by n:
        Anim.prototype.skewX = function(n) {
          return this.transform('skewX(' + n + 'deg)');
        };

        // Skew y by n:
        Anim.prototype.skewY = function(n) {
          return this.transform('skewY(' + n + 'deg)');
        };

        // Translate x and y axis:
        Anim.prototype.translate =
          Anim.prototype.to = function(x, y) {
            return this.transform(translate.join('' + x + 'px, ' + (y || 0) + 'px'));
          };

        // Translate on x axis:
        Anim.prototype.translateX =
          Anim.prototype.x = function(n) {
            return this.transform('translateX(' + n + 'px)');
          };

        // Translate on y axis:
        Anim.prototype.translateY =
          Anim.prototype.y = function(n) {
            return this.transform('translateY(' + n + 'px)');
          };

        // Scale x and y axis by x, or
        // individually scale x and y:
        Anim.prototype.scale = function(x, y) {
          return this.transform('scale(' + x + ', ' + (y || x) + ')');
        };

        // Scale x axis by n
        Anim.prototype.scaleX = function(n) {
          return this.transform('scaleX(' + n + ')');
        };

        // Scale y axis by n
        Anim.prototype.scaleY = function(n) {
          return this.transform('scaleY(' + n + ')');
        };

        // Define matrix transform:
        Anim.prototype.matrix = function(m11, m12, m21, m22, m31, m32) {
          return this.transform('matrix(' + [m11, m12, m21, m22, m31, m32].join(',') + ')');
        };

        // Rotate n degrees:
        Anim.prototype.rotate = function(n) {
          return this.transform('rotate(' + n + 'deg)');
        };

        // Set transition easing function to fn string.
        // Following shortcuts available:
        // no argument - "ease" is used
        // "in" - "ease-in" is used
        // "out" - "ease-out" is used
        // "in-out" - "ease-in-out" is used
        Anim.prototype.ease = function(fn) {
          fn = ease[fn] || fn || 'ease';
          return this.setVendorProperty('transition-timing-function', fn);
        };

        // Set animation properties:
        Anim.prototype.animate = function(name, props) {
          for (var i in props) {
            if (props.hasOwnProperty(i)) {
              this.setVendorProperty('animation-' + i, props[i]);
            }
          }
          return this.setVendorProperty('animation-name', name);
        };

        // Set duration to n milliseconds:
        Anim.prototype.duration = function(n) {
          n = this._duration = 'string' == typeof n ? parseFloat(n) * 1000 : n;
          return this.setVendorProperty('transition-duration', n + 'ms');
        };

        // Delay the animation by n milliseconds:
        Anim.prototype.delay = function(n) {
          n = 'string' == typeof n ? parseFloat(n) * 1000 : n;
          return this.setVendorProperty('transition-delay', n + 'ms');
        };

        // Set prop to val, deferred until .end() is invoked:
        Anim.prototype.setProperty = function(prop, val) {
          this._props[prop] = val;
          return this;
        };

        // Set a vendor prefixed prop with the given val:
        Anim.prototype.setVendorProperty = function(prop, val) {
          this.setProperty('-webkit-' + prop, val);
          this.setProperty('-moz-' + prop, val);
          this.setProperty('-ms-' + prop, val);
          return this;
        };

        // Set prop to value, deferred until .end() is invoked
        // and adds the property to the list of transition props:
        Anim.prototype.set = function(prop, val) {
          this.transition(prop);
          this._props[prop] = val;
          return this;
        };

        // ncrement prop by val, deferred until .end() is invoked
        // and adds the property to the list of transition props:
        Anim.prototype.add = function(prop, val) {
          if (!style) return;
          var self = this;
          return this.on('start', function() {
            var curr = parseInt(self.current(prop), 10);
            self.set(prop, curr + val + 'px');
          });
        };

        // Decrement prop by val, deferred until .end() is invoked
        // and adds the property to the list of transition props:
        Anim.prototype.sub = function(prop, val) {
          if (!style) return;
          var self = this;
          return this.on('start', function() {
            var curr = parseInt(self.current(prop), 10);
            self.set(prop, curr - val + 'px');
          });
        };

        // Get computed or "current" value of prop:
        Anim.prototype.current = function(prop) {
          return style(this.el).getPropertyValue(prop);
        };

        // Add prop to the list of internal transition properties:
        Anim.prototype.transition = function(prop) {
          if (!this._transitionProps.indexOf(prop)) return this;
          this._transitionProps.push(prop);
          return this;
        };

        // Commit style properties, aka apply them to 
        // the elemenet's style:
        Anim.prototype.applyProperties = function() {
          for (var prop in this._props) {
            this.el.style.setProperty(prop, this._props[prop], '');
          }
          return this;
        };

        // Re-select element via selector, replacing
        // the current element:
        Anim.prototype.anim =
          Anim.prototype.select = function(selector) {
            this.el = Anim.select(selector);
            return this;
          };

        // Defer the given fn until the animation
        // is complete:
        Anim.prototype.then = function(fn) {

          // Invoke .end():
          if (fn instanceof Anim) {
            this.on('end', function() {
              fn.run();
            });

            // Callback
          } else if ('function' == typeof fn) {
            this.on('end', fn);

            // Chain:
          } else {
            var clone = new Anim(this.el);
            clone._transforms = this._transforms.slice(0);
            this.then(clone);
            clone.parent = this;
            return clone;
          }

          return this;
        };

        // Return parent:
        Anim.prototype.pop = function() {
          return this.parent;
        };

        // Reset duration:
        Anim.prototype.reset = function() {
          this.el.style.webkitTransitionDuration =
            this.el.style.mozTransitionDuration =
            this.el.style.msTransitionDuration =
            this.el.style.oTransitionDuration = '';
          return this;
        };

        Anim.prototype.run = function(fn) {
          var self = this;

          // Emit "start" event:
          this.emit('start');

          // Transforms:
          if (this._transforms.length) {
            this.setVendorProperty('transform', this._transforms.join(' '));
          }

          // Transition properties:
          this.setVendorProperty('transition-properties', this._transitionProps.join(', '));
          this.applyProperties();

          // Callback given:
          if (fn) this.then(fn);

          // Emit "end" when complete:
          after.once(this.el, function() {
            self.reset();
            self.emit('end');
          });

          return this;
        };
        return Anim;
      })()
    })
  });
})(window);
// Truck Engine - OOP Module:
(function() {
  "use strict";
  $.extend({

    // Mixin one object into another:
    //===============================
    mixin: function(sourceObj, targetObj) {
      for (var key in sourceObj) {
        // Do not replace property if it exists:
        if (!(key in targetObj)) {
          targetObj[key] = sourceObj[key];
        }
      }
      return targetObj;
    },

    // Create a clone of an object.
    // This preserves the protytpe chain 
    // to the original:
    //==================================
    clone: function(obj) {
      if (typeof Object.create != 'function') {
        Object.create = (function() {
          function Temp() {}
          var hasOwn = Object.prototype.hasOwnProperty;

          return function(O) {
            if (typeof O != 'object') {
              throw TypeError('Object prototype may only be an Object or null');
            }
            Temp.prototype = O;
            var obj = new Temp();
            Temp.prototype = null;
            if (arguments.length > 1) {
              var Properties = Object(arguments[1]);
              for (var prop in Properties) {
                if (hasOwn.call(Properties, prop)) {
                  obj[prop] = Properties[prop];
                }
              }
            }
            return obj;
          };
        })();
      }
      return Object.create(obj);
    },

    // Define Modules with dependencies.
    //==================================
    Modules: (function Manager() {

      // Hold defined modules here:
      var modules = {};

      // dependencies is an array of quoted names.
      // implementatoin is a revealing module that returns a function.
      function add(name, dependencies, implementation) {
        if ($.type(dependencies) === 'function' && !implementation) {
          implementation = dependencies;
          dependencies = [];
        }
        var depLen = dependencies.length;
        for (var i = 0; i < depLen; i++) {
          dependencies[i] = modules[dependencies[i]];
        }
        modules[name] = implementation.apply(implementation, dependencies);
      }

      // Execute the named module:
      function run(name) {
        return modules[name];
      }

      // Delete a module:
      function remove(module) {
        delete(modules[module]);
      }

      // Expose Modules methods:
      return {
        add: add,
        run: run,
        remove: remove
      };
    })()
  });
})();

/*
  Truck body parts. These modules are used by both Truck Engine and jQuery. They are a set of widgets for users to interact with.
*/

// Truck Body - Adjust Navbar for iOS
(function() {
  $(function() {
    "use strict";
    //===============================
    // Method to center H1 in Navbar.
    // Check on widths of siblings:
    //===============================
    $.extend({
      AdjustNavbarLayout: function(screen) {
        if (!$('link[href*=ios]')[0]) return;
        screen = $(screen);
        var h1 = screen.find('h1');
        var siblings = h1.siblings();
        var whichSide;
        var oppositeSide;
        var rtl = ($('html').attr('dir') === 'rtl');
        var amount = 0;
        var hidden = false;
        var visibleSibling;

        var calculateLongest = function(a, b) {
          var widthA = a[0].clientWidth;
          var widthB = b[0].clientWidth;
          if (!widthA) {
            widthA = 0;
            whichSide = 'margin-right';
            oppositeSide = 'margin-left';
            if (rtl) {
              whichSide = 'margin-left';
              oppositeSide = 'margin-right';
            }
          }
          if (!widthB) {
            widthB = 0;
            whichSide = 'margin-left';
            oppositeSide = 'margin-right';
            if (rtl) {
              whichSide = 'margin-right';
              oppositeSide = 'margin-left';
            }
          }
          if (widthB > widthA) {
            whichSide = 'margin-left';
            oppositeSide = 'margin-right';
            if (rtl) {
              whichSide = 'margin-right';
              oppositeSide = 'margin-left';
            }
            amount = (widthB - widthA);
          } else if (widthA > widthB) {
            whichSide = 'margin-right';
            oppositeSide = 'margin-left';
            if (rtl) {
              whichSide = 'margin-left';
              oppositeSide = 'margin-right';
            }
            amount = (widthA - widthB);
          } else {
            amount = 0;
          }
        };

        function handleOneSibling(sib) {
          var sibling = sib || h1.siblings();
          amount = sibling[0].clientWidth;
          if (sibling.is(':first-child')) {
            whichSide = 'margin-right';
            oppositeSide = 'margin-left';
            if (rtl) {
              whichSide = 'margin-left';
              oppositeSide = 'margin-right';
            }
          } else if (sibling.is(':last-child')) {
            whichSide = 'margin-left';
            oppositeSide = 'margin-right';
            if (rtl) {
              whichSide = 'margin-right';
              oppositeSide = 'margin-left';
            }
          }
        }

        // If one sibling:
        if (siblings.length === 1) {
          handleOneSibling();

          // If two siblings:
        } else if (siblings.length === 2) {
          siblings.forEach(function(item) {
            if ($(item).css('display') === 'none') {
              hidden = true;
            } else {
              visibleSibling = $(item);
            }
          });
          if (hidden) {
            handleOneSibling(visibleSibling);
          } else {
            calculateLongest(siblings.eq(0), siblings.eq(1));
          }

          // H1 is alone:
        } else {
          whichSide = 'margin-left';
          oppositeSide = 'margin-right';
          amount = 0;
        }
        var props = {};
        props[whichSide] = amount;
        // props[oppositeSide] = 0;
        var sibwidth = 0;
        if (siblings.size()) {
          siblings.forEach(function(item) {
            sibwidth += $(item)[0].clientWidth;
          });
        }
        // alert(amount)
        var headerWidth = screen.find('nav').width() / 2;
        if ((sibwidth + 20) > headerWidth) {
          h1.css({
            'margin-left': 0,
            'margin-right': 0
          });
        } else {
          h1.css(props);
        }
      }
    });
    setTimeout(function() {
      $('screen').forEach(function(screen) {
        $.AdjustNavbarLayout(screen);
      });
    });
  });
})();
// Truck Body - Setup
(function() {
  "use strict";
  $(function() {
    if (!/(mobile)|(ios)|(android)/img.test(navigator.userAgent)) {
      $('body').addClass('isDesktop');
    }
    if ($('link[href*=ios]')[0]) {
      $('body').addClass('isiOS');
      $.AdjustNavbarLayout();
    } else if ($('link[href*=android]')[0]) {
      $('body').addClass('isAndroid');
    } else if ($('link[href*=windows]')[0]) {
      $('body').addClass('isWindows');
    }
  });
})();
// Truck Body - Button functions:
(function() {
  var truckBackButtonSVG = '<svg id="truck-back-button-svg" width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="truck-back-arrow" stroke="#979797"><path d="M50.7822487,4.05872022 L5.60302012,49.1913445 L50.4625593,94.6779982" id="back-arrow-bracket"></path><path d="M6,49.368351 L95.8300018,49.368351" id="back-arrow-shaft"></path></g></g></svg>';

  $.fn.extend({
    decorateBackButton: function() {
      if ($(this).hasClass('back') || $(this).hasClass('backTo')) {
        this.forEach(function(button) {
          var temp = $(button).text();
          $(button).html('<span>' + temp + '</span>');
          $(button).prepend(truckBackButtonSVG);
        });
      }
    }
  });
  $(function() {
    $('.back').decorateBackButton();
    $('.backTo').decorateBackButton();
  });
})();
// Truck Body - Navigation Module
(function() {
  $(function() {
    // Private variable to track navigation state:
    var isNavigating = false;
    // get screen by id:
    var getScreen = function(screen) {
      return $('#' + screen);
    };
    // Handle state of screens:
    var makeScreenCurrent = function(screen) {
      screen = $(screen);
      screen.addClass('current');
      screen.removeClass('previous');
      screen.removeClass('next');
    };
    var makeScreenPrevious = function(screen) {
      screen = $(screen);
      screen.removeClass('current');
      screen.removeClass('next');
      screen.addClass('previous');
    };
    var makeScreenNext = function(screen) {
      screen = $(screen);
      screen.removeClass('current');
      screen.removeClass('previous');
      screen.addClass('next');
    };

    $.extend({

      ///////////////////////////////
      // Navigate to Specific Article
      ///////////////////////////////
      GoToScreen: function(destination) {
        if (isNavigating) return;
        isNavigating = true;
        $.TruckRoutes.push(destination);
        var currentScreen = $.screens.getCurrent();
        var destinationScreen = (function() {
          var temp;
          var regex = /:/img;
          temp = regex.test(destination) ?
            destination.split(':')[0] : destination;
          return getScreen(temp);
        })();
        if (currentScreen[0]) currentScreen[0].scrollTop = 0;
        if (destinationScreen[0]) destinationScreen[0].scrollTop = 0;
        makeScreenPrevious(currentScreen);
        makeScreenCurrent(destinationScreen);
        $.Router.dispatch(destination);
        setTimeout(function() {
          isNavigating = false;
        }, 500);
      },

      ////////////////////////////////////
      // Navigate Back to Previous Article
      ////////////////////////////////////
      GoBack: function() {
        var currentScreen = $.screens.getCurrent();
        $.TruckRoutes.pop();
        var desintation = $.TruckRoutes.eq(-1);
        var dest = $.TruckRoutes.eq(-1).split(':')[0];
        var destinationScreen = getScreen(dest);
        if ($.TruckRoutes.size() === 0) {
          dest = $.screens.eq(0);
          $.TruckRoutes.push(dest[0].id);
        }
        if (currentScreen[0]) currentScreen[0].scrollTop = 0;
        if (destinationScreen[0]) destinationScreen[0].scrollTop = 0;
        $.Router.dispatch(desintation);
        makeScreenNext(currentScreen);
        makeScreenCurrent(destinationScreen);
        if ($.TruckRoutes.size() === 1) return;
      },

      isNavigating: false,

      //////////////////////////////////////
      // Navigate Back to Non-linear Article
      //////////////////////////////////////
      GoBackToScreen: function(destination) {
        var position = $.TruckRoutes.index(destination);
        var destinationScreen = getScreen(destination);
        var temp;
        while ($.TruckRoutes.size() > position + 1) {
          temp = $.TruckRoutes.pop();
          temp = getScreen(temp);
          makeScreenNext(temp);
        }
        makeScreenCurrent(destinationScreen);
        $.Router.dispatch(destination);
      }
    });


    ///////////////////////////////////////////////////////////
    // Make sure that navs and articles have navigation states:
    ///////////////////////////////////////////////////////////

    ///////////////////////////
    // Initialize Back Buttons:
    ///////////////////////////
    $('body').on('tap', '.back', function() {
      if (this.hasAttribute('disabled')) return;
      $.GoBack();
    });

    ////////////////////////////////
    // Handle navigation list items:
    ////////////////////////////////

    var handleNavigationEvent = function(element) {
      element = $(element);
      if ($.isNavigating) return;
      if (!element.hazAttr('data-goto')[0]) return;
      if (element.closest('ul').is('.deletable')) return;
      var destination = element.attr('data-goto');
      if (!destination) return;
      element.addClass('selected');
      setTimeout(function() {
        element.removeClass('selected');
      }, 1000);
      // Handle navigation:
      if ($.isAndroid || $.isChrome) {
        setTimeout(function() {
          $.GoToScreen(destination);
        }, 200);
      } else {
        $.GoToScreen(destination);
      }
    };
    $('body').on('tap', 'li', function() {
      handleNavigationEvent($(this));
    });
    $('body').on('doubletap', 'li', function() {
      if (!$.isNavigating) {
        handleNavigationEvent($(this));
      }
    });
  });
})();
// Truck Body - Tab Bar
(function() {
  "use strict";
  $.extend({
    //=========================================
    // Creates a Tab Bar for Toggling Articles:
    //=========================================
    TabBar: function(options) {
      /*
      var options = {
        id: 'mySpecialTabbar',
        labels: ["Refresh", "Add", "Info", "Downloads", "Favorite"],
        icons: ["refresh", "add", "info", "downloads", "favorite"],
        screens: [],
        selected: 2,
        showIcons: false // set to true for Android and Windows
      }
      */
      if (!options) return;
      var id = $.uuid();
      var settings = {
        selected: 0
      };
      $.extend(settings, options);
      if (!settings.icons.length) {
        settings.icons = settings.labels;
      }
      if (!settings.id) {
        settings.id = id;
      } else {
        id = settings.id;
      }

      // Private variable to keep track of screens:
      var __tabbarScreens = $();

      var screens = $();
      var screenPrefix = '#';

      if (settings.screens) {
        settings.screens.forEach(function(screen) {
          if (!/screenPrefix/img.test(screen)) {
            __tabbarScreens.push($(screenPrefix + screen)[0]);
            $(screenPrefix + screen).addClass('tabScreen');
          } else {
            __tabbarScreens.concat($(screen)[0]);
            $(screen).addClass('tabScreen');
          }
        });
      } else {
        settings.labels.forEach(function(screen, idx) {
          __tabbarScreens.push(screens.eq(idx));
        });
      }
      var selectedScreen;
      var showIcons = settings.showIcons ? ' class="showIcons" ' : '';

      // Helper: Set Screen to Current:
      //===============================
      var setToCurrent = function(element) {
        $(element).removeClass('previous').removeClass('next').addClass('current');
        $(element).attr('aria-hidden', 'false');
      };

      // Helper: Set Screen to Next:
      //============================
      var setToNext = function(element) {
        $(element).removeClass('current').addClass('next');
        $(element).attr('aria-hidden', 'true');
      };

      // Create tabs:
      //=============
      var makeTab = function(label, icon, idx) {
        var tab = '<button role="tab" class="' + icon;
        if (settings.selected === idx) {
          tab += ' selected';
        }
        tab += '"';
        if (settings.screens && settings.screens.length) {
          tab += ' data-id="' + settings.screens[idx] + '"';
        }
        tab += '><span class="icon"></span><label>' + settings.labels[idx] + '</label></button>';
        return tab;
      };
      // Create tab bar:
      //================
      var tabbarTmpl = $('<tabbar role="tabpanel"' + showIcons + '></tabbar>');
      tabbarTmpl[0].id = settings.id;
      tabbarTmpl.addClass('tabbar');

      setToNext($('screen'));
      selectedScreen = $('screen').eq(settings.selected);
      setToCurrent(selectedScreen);

      if (settings.labels.length) {
        settings.labels.forEach(function(label, idx) {
          tabbarTmpl.append(makeTab(label, settings.icons[idx], idx));
        });
      }
      $('body').prepend(tabbarTmpl);



      // Get id of appended tab bar:
      var tabbar = $('#' + settings.id);

      // Private variables to manage tab bar: 
      var __tabbarButtons = tabbar.find('button');
      var __selectedTabbarButton = __tabbarButtons.eq(settings.selected);
      var __selectedTabbarScreen = __tabbarScreens.eq(settings.selected);




      // Setup events on tabs:
      //======================
      $(function() {

        $.TruckRoutes.purge();
        $.TruckRoutes.push(__tabbarScreens.eq(settings.selected)[0].id);

        var tabbarButtons = tabbar.find('button');
        $.Router.dispatch(__selectedTabbarScreen[0].id);
        tabbarButtons.forEach(function(button, idx) {
          $(button).data('truck-route', __tabbarScreens.eq(idx)[0].id);
        });

        // Tap on tab:
        tabbar.on('tap', 'button', function() {
          var routes = $(this).data('truck-route').split('/');
          var fullRoute = $.TruckRoutes.getFullRoute();

          // This tab holds a navigation list:
          if (routes.length > 1) {
            __tabbarButtons.hazClass('selected').data('truck-route', fullRoute);
            __tabbarButtons.hazClass('selected').removeClass('selected').addClass('next');
            // Set this tab to `selected`:
            $(this).addClass('selected');
            // Deal with previously selected tab and screen:
            $('screens').removeClass('current').addClass('next')
              .attr('aria-hidden', true);
            $('screens').removeClass('previous').addClass('next')
              .attr('aria-hidden', true);
            var navRoutesFull = $(this).data('truck-route');
            var navRoutes = navRoutesFull.split('/');
            navRoutes.forEach(function(route, idx) {
              var routing = route.split(':');
              var whichRoute = routing[0];
              if (idx !== routes.length - 1) {
                $('#' + whichRoute).removeClass('next').addClass('previous').attr('aria-hidden', true);
              } else {
                $('#' + whichRoute).removeClass('next').addClass('current').attr('aria-hidden', false);
              }
            });
            // Take care of routes:
            $.TruckRoutes.purge();
            $.TruckRoutes.concat(navRoutes);
            $.Router.dispatch(routes[routes.length - 1]);

            // This tab has a single screen:
          } else {

            __tabbarButtons.hazClass('selected').data('truck-route', fullRoute);
            __tabbarButtons.hazClass('selected').removeClass('selected').addClass('next');
            // Deal with previously selected tab and screen:
            $('screen').removeClass('current').addClass('next')
              .attr('aria-hidden', true);
            $('screen').removeClass('previous').addClass('next')
              .attr('aria-hidden', true);
            // Set this tab to `selected`:
            $(this).addClass('selected');
            // Make this tab's screen `current`:
            $.screens.eq($(this).index()).removeClass('next').removeClass('previous')
              .addClass('current').attr('aria-hidden', false);
            // Take care of routes:
            $.TruckRoutes.purge();
            $.TruckRoutes.concat(routes);
            $.Router.dispatch(fullRoute);

          }
        });
      });

      return {

        getSelectedTab: function() {
          return __selectedTabbarButton;
        },

        getSelectedScreen: function() {
          return __selectedTabbarScreen;
        },

        setSelectedTab: function(position) {
          tabbar.find('button').iz('.selected').removeClass('selected').addClass('next');
          tabbar.children('button').eq(position).addClass('selected');
          setToNext(__tabbarScreens.iz('.current')[0]);
          setToCurrent(__tabbarScreens.eq(position)[0]);
        }
      };
    }
  });
})();
// Tank Body - Slide Out Menu
(function() {
  'use strict';
  $.extend({
    //========================
    // Setup a slide out menu:
    //========================
    SlideOut: function() {
      var slideOutButton = $('<button class="slide-out-button"></button>');
      var slideOut = '<slideout><section></section></slideout>';
      $('body').prepend(slideOut);
      $('body').append(slideOutButton);
      // Get Slide Out & Slide Out button:
      var slideout = $('slideout');
      var slideOutBtn = $('button.slide-out-button');

      // Set up state for Slide Out and screens:
      slideout.attr('aria-hidden', true);
      $("screens").attr('aria-hidden', true);
      $("screens").eq(0).addClass('show').attr('aria-hidden', "false");

      // Handle Slide Out button events:
      slideOutBtn.on('tap', function() {
        $(this).toggleClass('focused');
        if (slideout.hasClass('open')) {
          slideout.removeClass('open');
          slideout.removeAttr('aria-hidden');
          $('button.back').removeClass('disabled').removeProp('disabled');
          $('button.backTo').removeClass('disabled').removeProp('disabled');
        } else {
          slideout.addClass('open')
          slideout.attr('aria-hidden', true);
          $('button.back').addClass('disabled').prop('disabled', true);
          $('button.backTo').addClass('disabled').prop('disabled', true);
        }
      });

      $('slideout').on('tap', 'li', function() {
        var menuItems = slideout.find('li[data-show]');
        slideout.attr('aria-hidden', 'true')

        // Toggle Slide Out button:
        slideOutBtn.toggleClass('focused');

        $('button.back').removeClass('disabled').removeProp('disabled');
        $('button.backTo').removeClass('disabled').removeProp('disabled');

        // This list item shows a single screen:
        menuItems.hazClass('selected').removeClass('selected');
        $.screens.hazClass('show').removeClass('show').attr('aria-hidden', true);
        var screenToShow = $(this).attr('data-show');
        $('#' + screenToShow.split(':')[0]).addClass('show').attr('aria-hidden', false);
        $('screen.current').addClass('next').removeClass('current');
        $('screen.previous').addClass('next').removeClass('previous');
        // Get route to dispatch:
        $.Router.dispatch(screenToShow);

        // Close slide out:
        slideout.removeClass('open');
      });

      return {
        populate: function(options) {
          var slideout = $('slideout');
          if (!slideout[0]) return;
          if (!options) {
            return;
          } else {
            slideout.find('section').append('<ul class="list"></ul>');
            var list = slideout.find('ul');
            options.forEach(function(ctx) {
              for (var key in ctx) {
                if (key === 'header') {
                  list.append('<li class="menu-header"><h2>' + ctx[key] + '</h2></li>');
                } else {
                  list.append('<li data-show="' + key + '"><h3>' + ctx[key] + '</h3></li>');
                }
              }
            });
            slideout.find('li').eq(0).addClass('selected');
          }
        }
      };
    }
  });
})();
(function() {
  'use strict';
  $.extend({
    //=================================
    // Setup an editable list, enabling
    // reording of items and deletion:
    //=================================
    EditList: function(options) {
      /*
        options = {
          editLabel: labelName,
          doneLabel: labelName,
          deleteLabel: labelName,
          cancelLabel: cancelName,
          callback: callback (Tapping "Done" fires this),
          deletable: false (no deletables),
          movable: false (no movables),
          model: myModel,
          modelProp: 'id',
          view: myView
        }
      */
      var settings = {
        editLabel: 'Edit',
        doneLabel: 'Done',
        deleteLabel: 'Delete',
        cancelLabel: 'Cancel',
        callback: $.noop,
        deletable: true,
        movable: true,
        model: undefined,
        modelProp: 'id',
        view: undefined
      };

      var __data = [];
      if (!options) {
        return;
      }
      $.extend(settings, options);
      var __model = settings.model || false;

      if (!settings.deletable && !settings.movable) {
        return;
      }
      var __view = settings.view;

      if (options) $.extend(settings, options);

      var deleteButton;
      var editButton;
      var deletionIndicator;
      var button;
      var dispelDeletable = 'swiperight';
      var enableDeletable = 'swipeleft';
      var moveUpIndicator;
      var moveDownIndicator;
      var element = settings.element;
      var deleteLabel;

      var dir = $('html').attr('dir');
      dir = dir ? dir.toLowerCase() : '';
      if (dir === 'rtl') {
        dispelDeletable = 'swipeleft';
        enableDeletable = 'swiperight';
      }
      if ($('link[href*=windows]')[0]) {
        deleteLabel = '';
      }

      if (settings.deletable) {
        deleteButton = $.concat('<button class="delete"><label>', settings.deleteLabel, '</label><svg width="27px" height="30px" viewBox="0 0 27 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="delete-icon" fill="#3A3A3A"><g transform="translate(3.000000, 1.000000)"><path d="M1,6 L20,6 L20,24.9986131 C20,26.6562333 18.6639569,28 16.9998779,28 L4.00012207,28 C2.3432004,28 1,26.6569187 1,24.9986131 L1,6 Z M4,9 L5,9 L5,25 L4,25 L4,9 Z M8,9 L9,9 L9,25 L8,25 L8,9 Z M12,9 L13,9 L13,25 L12,25 L12,9 Z M16,9 L17,9 L17,25 L16,25 L16,9 Z" id="can"></path><path d="M0,4.96611425 L0,1.67759301 L5.1776507,1.7511163 L6.482399,0 L14.5847825,0 L15.8789491,1.7511163 L21,1.7511163 L21,4.9447157 L0,4.96611425 L0,4.96611425 Z" id="lid"></path></g></g></g></svg></button>');
        deletionIndicator = '<span class="deletion-indicator"><svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="deletion-indicator"><g id="ios-indicator"><circle id="ios-circle" fill="#FF0000" cx="10" cy="10" r="10"></circle><path d="M3.5,10 L16.5,10" id="ios-bar" stroke="#FFFFFF" stroke-width="2" stroke-linecap="square"></path></g><path d="M2,13 L9.9294326,16.8406135 L17.1937075,1.90173332" id="checkmark" stroke="#FA0303" stroke-width="2"></path></g></g></svg></span>';
        $(element).addClass('deletable');
      }
      if (settings.movable) {
        moveUpIndicator = '<span class=\'move-up\'><svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="move-indicator"><circle id="circle" cx="11" cy="11" r="10"></circle><path d="M4,13.9645823 L10.9316382,5.94630319 L17.795297,13.9073417" id="move-up"></path></g></g></svg></span>';
        moveDownIndicator = '<span class=\'move-down\'><svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="move-indicator"><circle id="circle" cx="11" cy="11" r="10"></circle><path d="M4.0421421,7.98172087 L10.912246,16 L17.7960071,8.1103389" id="move-down"></path></g></g></svg></span>';
        $(element).addClass('editable');
      }

      editButton = $.concat('<button class="edit">', settings.editLabel, '</button>');
      var nav = $(element).closest('screen').find('nav');
      nav.append(editButton);
      nav.find('.back').hide();
      nav.prepend('<button class="cancel">' + settings.cancelLabel + '</button>');
      nav.find('.cancel').hide();
      $.AdjustNavbarLayout($(element).closest('screen'));

      button = $(element).closest('screen').find('.edit');
      $(element).find('li').forEach(function(ctx) {
        if (!$(ctx).has('.deletion-indicator').length) {
          if (settings.deletable) {
            $(ctx).prepend(deletionIndicator);
          }
          if (settings.movable) {
            $(ctx).append(moveDownIndicator);
            $(ctx).append(moveUpIndicator);
          }
          if (settings.deletable) {
            $(ctx).append(deleteButton);
          }
        }
      });

      // Callback to setup indicator interactions:
      var setupDeletability = function(callback, list, button) {
        $(function() {

          // Check for view and update its template:
          if (__view) {
            var temp = $('<div></div>');
            temp[0].insertAdjacentHTML('afterbegin', __view.getTemplate());
            temp.find('li').prepend(deletionIndicator);
            temp.find('li').append(moveDownIndicator);
            temp.find('li').append(moveUpIndicator);
            var template = temp.html();
            __view.setTemplate(template);
          }

          button.on('tap', function() {
            var $this = this;

            // When button is in "Edit" state:
            if (this.classList.contains('edit')) {
              setTimeout(function() {
                $this.classList.remove('edit');
                $this.classList.add('done');
                $($this).text(settings.doneLabel);
                $(list).addClass('showIndicators');
                $($this).siblings('.back').hide();
                $($this).siblings('.cancel').show();
              });

              // When button is in "Done" state:
            } else if (this.classList.contains('done')) {
              // Execute callback if edit was performed:
              //========================================
              if ($(list).data('list-edit')) {
                callback.call(callback, list);
              }
              setTimeout(function() {
                $this.classList.remove('done');
                $this.classList.add('edit');
                $($this).text(settings.editLabel);
                $(list).removeClass('showIndicators');
                $(list).find('li').removeClass('selected');
                $($this).siblings('.cancel').hide();
              });
              var movedItems = [];
              $(list).find('li').forEach(function(ctx, idx) {
                __data.push($(ctx).attr('data-id'));
              });

              // Reorder model based on user choice:
              if (__model) {
                var __newarray = [];
                __data.filter(function(item) {
                  var ret = __model.filter(function(b) {
                    return b[settings.modelProp] === item;
                  });
                  __newarray.push(ret[0]);
                });
                __data = [];
                __model.purge();
                __model.concat(__newarray, true);
                __newarray = [];
              }
            }
            setTimeout(function() {
              $.AdjustNavbarLayout($(element).closest('screen'));
            })
          });

          // Handle deletion indicators:
          $(list).off('tap', '.deletion-indicator');
          $(list).on('tap', '.deletion-indicator', function() {
            if ($(this).closest('li').hasClass('selected')) {
              $(this).closest('li').removeClass('selected');
              return;
            } else {
              $(this).closest('li').addClass('selected');
            }
          });

          // Handle swipe gestures:
          $(list).on(dispelDeletable, 'li', function() {
            // If no deletables, disable swipes:
            if (!settings.deletable) return;
            // Else reveal delete button:
            $(this).removeClass('selected');
          });

          $(list).on(enableDeletable, 'li', function() {
            // If no deletables, disable swipes:
            if (!settings.deletable) return;
            // Else reveal delete button:
            $(this).addClass('selected');
          });

          // Move list item up:
          $(list).on('tap', '.move-up', function(e) {
            var item = $(this).closest('li');
            if (item.is('li:first-child')) {
              return;
            } else {
              // Mark list as edited:
              $(list).data('list-edit', true);
              item = $(this).closest('li');
              var prev = item.prev();
              // Clone the items to replace the
              // transitioned ones alter:
              var itemClone = item.clone();
              var prevClone = prev.clone();
              var height = item[0].offsetHeight;
              item.css({
                "-webkit-transform": "translate3d(0,-" + height + "px,0)",
                "transform": "translate3d(0,-" + height + "px,0)"
              });

              prev.css({
                "-webkit-transform": "translate3d(0," + height + "px,0)",
                "transform": "translate3d(0," + height + "px,0)"
              });
              setTimeout(function() {
                $.replace(prevClone, item);
                $.replace(itemClone, prev);
              }, 250);
            }
          });

          // Move list item down:
          $(list).on('tap', '.move-down', function(e) {
            var item = $(this).closest('li');
            var next = item.next();
            if (item.is('li:last-child')) {
              return;
            } else {
              // Clone the items to replace the
              // transitioned ones alter:
              var itemClone = item.clone();
              var nextClone = next.clone();
              // Mark list as edited:
              $(list).data('list-edit', true);

              var height = item[0].offsetHeight;
              item.css({
                '-webkit-transform': 'translate3d(0,' + height + 'px,0)',
                transform: 'translate3d(0,' + height + 'px,0)'
              });
              next.css({
                "-webkit-transform": "translate3d(0,-" + height + "px,0)",
                "transform": "translate3d(0,-" + height + "px,0)"
              });
              setTimeout(function() {
                $.replace(nextClone, item);
                $.replace(itemClone, next);
              }, 250);
            }
          });

          // Handle deletion of list item:
          $(list).on('tap', '.delete', function() {
            var $this = this;
            var listItem = $(this).parent();

            // Mark list as edited:
            $(list).data('list-edit', true);
            var direction = '-1200%';
            if ($('html').attr('dir') === 'rtl') direction = '1000%';
            $(this).siblings().css({
              '-webkit-transform': 'translate3d(' + direction + ',0,0)',
              '-webkit-transition': 'all 1s ease-out',
              'transform': 'translate3d(' + direction + ',0,0)',
              'transition': 'all 1s ease-out'
            });

            setTimeout(function() {
              listItem.remove();
            }, 500);
          });

          // Cancel edits:
          nav.find('.cancel').on('tap', function() {
            nav.find('.back').show();
            $(this).hide();
            __view.render();
            nav.find('.done').addClass('edit').removeClass('done');
            $(list).removeClass('showIndicators');
            $(list).find('li').removeClass('selected');
            $(this).hide();
          });
        });
      };
      // Initialize the editable list:
      setupDeletability(settings.callback, element, button);

      return {
        getModel: function() {
          return __model;
        },

        getView: function() {
          return __view;
        }
      };
    }
  });
})();
// Truck Body - Form Validation & JSON
(function() {
  'use strict';
  $.extend({
    //===========================================
    // Setup Form object to convert data to JSON,
    // and to validate form values:
    //===========================================
    Form: function(options) {
      if (!options || $.type(options) !== 'array') return;

      var __passed = false;
      var __errors = [];
      var __result = [];

      // Helper to validate form elements:
      //==================================
      function validateElement(item) {
        if (!__passed) {
          __errors.push({
            element: item.element,
            type: item.type
          });
          if (item.callback) item.callback();
        } else {
          convertToObject($(item.element).attr('name'), $(item.element).val());
        }
      }

      // Helper to convert form element names to JSON:
      //==============================================
      function convertToObject(name, value) {
        __result.push({
          name: name,
          value: value
        });
      }

      // Convert form names and values to JSON:
      //=======================================
      function convertObjectToJSON(data) {
        var delimiter = '_';
        var result = {};
        var arrays = {};
        data.forEach(function(item) {
          var value = item.value;
          if (value !== '') {
            var name = item.name;
            var nameParts = name.split(delimiter);
            var currResult = result;
            for (var j = 0; j < nameParts.length; j++) {
              var namePart = nameParts[j];
              var arrName;
              if (namePart.indexOf('[]') > -1 && j === nameParts.length - 1) {

                arrName = namePart.substr(0, namePart.indexOf('['));
                if (!currResult[arrName]) {
                  currResult[arrName] = [];
                }
                currResult[arrName].push(value);
              } else {
                if (namePart.indexOf('[') > -1) {
                  arrName = namePart.substr(0, namePart.indexOf('['));
                  var arrIdx = namePart.replace(/^[a-z]+\[|\]$/gi, '');
                  if (!arrays[arrName]) {
                    arrays[arrName] = {};
                  }
                  if (!currResult[arrName]) {
                    currResult[arrName] = [];
                  }
                  if (j === nameParts.length - 1) {
                    currResult[arrName].push(value);
                  } else {
                    if (!arrays[arrName][arrIdx]) {
                      currResult[arrName].push({});
                      arrays[arrName][arrIdx] = currResult[arrName][currResult[arrName].length - 1];
                    }
                  }
                  currResult = arrays[arrName][arrIdx];
                } else {
                  if (j < nameParts.length - 1) {
                    if (!currResult[namePart]) {
                      currResult[namePart] = {};
                    }
                    currResult = currResult[namePart];
                  } else {
                    currResult[namePart] = value;
                  }
                }
              }
            }
          }
        });
        return result;
      }

      // Validate form elements:
      //========================
      options.forEach(function(item) {
        switch (item.type) {
          case 'notempty':
            __passed = validateElement(item.element, item.type);
            __errors.push({
              element: item.element,
              type: item.type
            });
            return;
          case 'number':
            __passed = $(item.element).validateNumber();
            validateElement(item);
            return;
          case 'text':
            __passed = $(item.element).validateAlphabetic();
            validateElement(item);
            return;
          case 'alphanumeric':
            __passed = $(item.element).validateAlphaNumeric();
            validateElement(item);
            return;
          case 'username':
            __passed = $(item.element).validateUserName(item.min);
            validateElement(item);
            // minimum length
            return;
          case 'email':
            __passed = $(item.element).validateEmail();
            validateElement(item);
            return;
          case 'phone':
            __passed = $(item.element).validatePhoneNumber();
            validateElement(item);
            return;
          case 'url':
            __passed = $(item.element).validateUrl();
            validateElement(item);
            return;
          case 'age':
            __passed = $(item.element).validateAge(item.min);
            validateElement(item);
            // minimum length
            return;
          case 'checkbox':
            __passed = $(item.element).validateCheckbox();
            if (__passed) {
              // var checkbox = $(item.element)[0];
              validateElement(item);
            }
            return;
          case 'radio':
            __passed = $(item.element).validateRadioButtons();
            validateElement(item);
            return;
          case 'selectbox':
            __passed = $(item.element).validateSelectBox();
            validateElement(item);
            return;
          case 'password':
            __passed = $.validatePassword(item.element, item.element2, item.min);
            __errors.push({
              element: item.element,
              element2: item.element2,
              type: item.type
            });
            // input1, input2, minimum length
            return;
          case 'switch':
            __passed = $(item.element).validateSwitch();
            if (__passed) {
              validateElement(item);
            }
            return;
          case 'selectlist':
            __passed = $(item.element).validateSelectList();
            if (__passed) {
              validateElement(item);
            }
          case 'multiselectlist':
            __passed = $(item.element).validateMultiSelectList();
            var inputs;
            if (__passed) {
              inputs = $(item.element).find('input[type=checkbox]');
              inputs.forEach(function(item) {
                if (item.checked) {
                  convertToObject(item.name, item.value);
                }
              });
            }
        }
        if (item.type.match(/custom/)) {
          var cv = $.customValidators.filter(function(validator) {
            return (validator.name) === item.type;
          });
          if (cv) {
            var result = $.validateWithRegex(item.element, cv[0].regex);
            if (result) {
              var el = $(item.element);
              convertToObject(el[0].name, el[0].value);
            } else {
              __errors.push({
                element: item.element,
                type: item.type
              });
              if (item.callback) item.callback();
            }
          }
        }
      });



      return {
        getErrors: function() {
          if (__errors.length) {
            return __errors;
          }
        },

        errors: function() {
          if (__errors.length) {
            return true;
          }
        },

        get: function() {
          // console.log(__result)
          return convertObjectToJSON(__result);
        }
      };
    }
  });
})();
// Truck Body - Select List
(function() {
  'use strict';
  $.extend({
    //=====================
    // Setup a select list:
    //=====================
    SelectList: function(options) {
      if (!options || !options.element) return;
      var settings = {
        element: undefined,
        selected: undefined,
        name: $.uuid(),
        callback: $.noop,
        model: undefined
      };
      var __selection = {};

      $.extend(settings, options);
      var name = settings.name;
      var list = $(settings.element);
      list.addClass('select-list');
      list.find('li').forEach(function(ctx, idx) {
        var value = ctx.getAttribute("data-select") !== null ? ctx.getAttribute("data-select") : "";
        ctx.setAttribute('role', 'radio');
        $(ctx).removeClass('selected').find('input').removeAttr('checked');
        $(ctx).append('<span class="selection-indicator"><svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="selection-indicator"><path d="M2,13 L9.9294326,16.8406135 L17.1937075,1.90173332" id="checkmark" stroke="#007AFF" stroke-width="2"></path><circle id="outer-circle" stroke="#007AFF" stroke-width="2" cx="10" cy="10" r="9"></circle><circle id="inner-circle" fill="#007AFF" cx="10" cy="10" r="4"></circle></g></g></svg></span>');
        if (settings.selected === idx) {
          ctx.setAttribute('aria-checked', 'true');
          ctx.classList.add('selected');
          if (!$(ctx).find('input')[0]) {
            $(ctx).append('<input type="radio" checked="checked" name="' + name + '" value="' + value + '">');
          } else {
            $(ctx).find('input').prop('checked', true).attr('value', value);
          }
          __selection = {
            index: settings.selected,
            value: value
          };
        } else {
          if (!$(ctx).find('input')[0]) {
            $(ctx).append('<input type="radio" name="' + name + '" value="' + value + '">');
          }
        }
      });
      list.on('tap', 'li', function() {
        var item = $(this);
        __selection = {
          index: item.index(),
          value: item.find('input').val()
        };
        item.siblings('li').removeClass('selected');
        item.siblings('li').removeAttr('aria-checked');
        item.siblings('li').find('input').removeProp('checked');
        item.addClass('selected');
        item.attr('aria-checked', true);
        item.find('input').prop('checked', true);
        settings.callback.apply(this, arguments);
      });

      return {
        getSelection: function() {
          return __selection;
        }
      };
    }
  });
})();
// Truck Body - Multi-Select List
(function() {
  'use strict';
  $.extend({
    //===========================
    // Setup a multi-select list:
    //===========================
    MultiSelectList: function(options) {
      if (!options || !options.element) return;
      var settings = {
        element: undefined,
        selected: [],
        name: $.uuid(),
        callback: $.noop,
        model: undefined
      };
      var __selection = $.Stack();
      $.extend(settings, options);
      var selections = settings.selected;
      var name = settings.name;
      var list = $(settings.element);
      list.addClass('multi-select-list');
      list.find('li').forEach(function(ctx, idx) {
        var value = ctx.getAttribute("data-select") !== null ? ctx.getAttribute("data-select") : "";
        selections.forEach(function(item) {
          if (item.index === idx) {
            __selection.push({
              index: idx,
              value: value
            });
          }
        });

        ctx.setAttribute('role', 'checkbox');
        $(ctx).removeClass('selected').find('input').removeAttr('checked');
        $(ctx).prepend('<span class="multi-selection-indicator"><svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="multi-select-icon" stroke="#979797"><g id="multi-select-circle-+-mulit-select-checkmark" transform="translate(2.000000, 2.000000)"><circle id="multi-select-circle" cx="13" cy="13" r="13"></circle><path d="M4.71521456,15.9877529 L13.0000002,20.7028494 L19.977049,5.70284941" id="mulit-select-checkmark"></path></g></g></g></svg></span>');
        $(ctx).append('<input type="checkbox" name="' + name + '" value="' + value + '">');
        if (selections.length) {
          selections.forEach(function(sel) {
            if (sel === idx) {
              ctx.setAttribute('aria-checked', 'true');
              ctx.classList.add('selected');
              $(ctx).find('input').prop('checked', true).attr('value', value);
              __selection.push({
                index: sel,
                value: value
              });
            }
          });

        }
      });

      list.on('tap', 'li', function() {
        var item = $(this);
        if (item.hasClass('selected')) {
          item.removeClass('selected').removeAttr('aria-checked');
          item.find('input').removeProp('checked');
          var dataObj = {
            index: item.index(),
            value: item.attr('data-select')
          }
          var pos;
          __selection.forEach(function(item, idx) {
            if (item.index === dataObj.index && item.value === dataObj.value) {
              pos = idx;
            }
          });
          __selection.splice(pos, 1);

          settings.callback.apply(this, arguments);
        } else {
          __selection.push({
            index: item.index(),
            value: item.attr('data-select')
          });
          __selection.unique();
          item.addClass('selected');
          item.attr('aria-checked', true);
          item.find('input').prop('checked', true);

          settings.callback.apply(this, arguments);
        }

      });

      return {
        getSelection: function() {
          return __selection.getData();
        }
      };
    }
  });
})();
// Truck Body - Switches
(function() {
  "use strict";
  $.extend({
    //=========================
    // Create a switch control:
    //=========================
    Switch: function(options) {
      if (!options || !options.element) return;
      var __checked = false;
      var settings = {
        element: undefined,
        name: undefined,
        value: undefined,
        checked: false,
        onCallback: $.noop,
        offCallback: $.noop
      };

      $.extend(settings, options);
      var __selection = {
        checked: __checked,
        value: settings.value
      };

      var __element = $(settings.element);
      __checked = settings.checked;

      // Abrstract swipe for left-to-right and right-to-left:
      var swipeOn = "swiperight";
      var swipeOff = "swipeleft";
      if (document.documentElement.dir === "rtl") {
        swipeOn = "swipeleft";
        swipeOff = "swiperight";
      }

      var checkState = settings.checked ? ' checked' : '';
      var __switch = $.concat(
        '<em></em>',
        '<input type="checkbox" name="',
        settings.name,
        '"',
        checkState,
        ' value="',
        settings.value,
        '">'
      );

      __element.append(__switch);

      if (__checked) {
        __element.addClass('checked');
        __element.attr('role', 'checkbox');
      }

      __element.on('tap', function() {
        var checkbox = this.querySelector('input');
        if (this.classList.contains('checked')) {
          this.classList.remove('checked');
          this.setAttribute('aria-checked', false);
          checkbox.removeAttribute('checked');
          __selection.checked = false;
          __checked = false;
          settings.offCallback.call(this);
        } else {
          this.classList.add('checked');
          checkbox.setAttribute('checked', 'checked');
          this.setAttribute('aria-checked', true);
          __selection.checked = true;
          __checked = true;
          settings.onCallback.call(this);
        }
      });
      __element.on(swipeOn, function() {
        var checkbox = this.querySelector('input');
        if (this.classList.contains('checked')) {
          this.classList.remove('checked');
          this.setAttribute('aria-checked', false);
          checkbox.removeAttribute('checked');
          __selection.checked = true;
          __checked = true;
          settings.offCallback.call(this);
        }
      });
      __element.on(swipeOff, function() {
        var checkbox = this.querySelector('input');
        if (!this.classList.contains('checked')) {
          this.classList.add('checked');
          checkbox.setAttribute('checked', 'checked');
          this.setAttribute('aria-checked', true);
          __selection.checked = false;
          __checked = false;
          settings.onCallback.call(this);
        }
      });

      return {
        getValue: function() {
          return __selection;
        }
      };
    }
  });
})();
// Truck Body - Screen Blocker:
(function() {
  "use strict";
  $.extend({

    //==============
    // Cover screen:
    //==============
    Block: function(opacity) {
      opacity = opacity ? " style='opacity:" + opacity + "'" : " style='opacity: .5;'";
      if ($('.mask')[0]) return;
      $('body').append("<div class='mask'" + opacity + "></div>");
      $('screen.current').attr('aria-hidden', true);
    },

    //================
    // Uncover screen:
    //================
    Unblock: function() {
      $('.mask').remove();
      $('screen.current').removeAttr('aria-hidden');
    }
  });
})();
// Truck Body - Popup
(function() {
  'use strict';
  $.extend({
    //=======================
    // Setup  a popup dialog:
    //=======================
    Popup: function(options) {
      /*
      options {
        id: 'alertID',
        title: 'Alert',
        message: 'This is a message from me to you.',
        cancelButton: 'Cancel',
        continueButton: 'Go Ahead',
        width: '100px',
        callback: function() { // do something },
        empty: true
      }
      */
      if (!options) return;
      var settings = {};
      settings.id = $.uuid();
      settings.content = true;
      $.extend(settings, options);
      var width = '';
      if (settings.width) {
        width = ' style="width:' + settings.width + 'px;" ';
      }

      var id = settings.id;
      var title = settings.title ? '<header><h1>' + settings.title + '</h1></header>' : '';
      var message = settings.message ? '<p role="note">' + options.message + '</p>' : '';
      var cancelButton = options.cancelButton ? '<button class="cancel" role="button">' + settings.cancelButton + '</button>' : '';
      var continueButton = settings.continueButton ? '<button class="continue" role="button">' + settings.continueButton + '</button>' : '';
      var callback = settings.callback || $.noop;
      var panelClose;
      var popup;
      if (settings.empty) {
        popup = $.concat('<div' + width + ' class="popup closed" role="alertdialog" id="', id, '"></div>');
      } else {
        popup = $.concat('<div class="popup closed', '" role="alertdialog" id="', id, '"><div class="panel">', title, message, '</div><footer>', cancelButton, continueButton, '</footer>', panelClose, '</div>');
      }

      $('body').append(popup);
      if (callback && continueButton) {
        $('.popup').find('.continue').on($.eventStart, function() {
          var $this = $(this);
          if ($.isAndroid || $.isChrome) {
            $this.addClass('selected');
            setTimeout(function() {
              $this.removeClass('selected');
              $('.popup').ClosePopup();
              callback.call(callback);
            }, 300);
          } else {
            $('.popup').ClosePopup();
            callback.call(callback);
          }
        });
        $('.popup').find('.cancel').on($.eventStart, function() {
          var $this = $(this);
          if ($.isAndroid || $.isChrome) {
            $this.addClass('selected');
            setTimeout(function() {
              $this.removeClass('selected');
              $('.popup').ClosePopup();
            }, 300);
          } else {
            $('.popup').ClosePopup();
          }
        });
      }

      $.CenterPopup();
      var events = $.eventStart + ' tap ' + $.eventEnd;
      $('.mask').on(events, function(e) {
        e.stopPropagation();
      });
    },

    // Hanle Orientation Change:
    //==========================
    CenterPopup: function() {
      var popup = $('.popup');
      if (!popup[0]) return;
      var tmpTop = ((window.innerHeight / 2) + window.pageYOffset) - (popup[0].clientHeight / 2) + 'px';
      var tmpLeft;
      if (window.innerWidth === 320) {
        tmpLeft = '10px';
      } else {
        tmpLeft = Math.floor((window.innerWidth - popup[0].clientWidth) / 2) + 'px';
      }
      if ($('body').hasClass('isWindows')) {
        popup.css({
          top: tmpTop
        });
      } else {
        popup.css({
          left: tmpLeft,
          top: tmpTop
        });
      }
    }
  });
  $.fn.extend({
    // Show Popup:
    //============
    ShowPopup: function() {
      $.Block('0.5');
      $(this).removeClass('closed');
      $(this).addClass('opened');
      $.CenterPopup();
    },

    // Close Popup:
    //=============
    ClosePopup: function() {
      $.Unblock();
      $(this).removeClass('opened');
      $(this).addClass('closed');
    }
  });

  // Reposition popups on window resize:
  //====================================
  $(function() {
    window.onresize = function() {
      $.CenterPopup();
    };
  });
})();
// Tank Body - Segmented Buttons
(function() {
  'use strict';
  $(function() {
    $.extend({
      //==========================
      // Setup a segmented button:
      //==========================
      Segmented: function(options) {
        if (!options || !options.element) return;
        /* 
          options = {
            element: '#segmentHolder'
            labels : ['first','second','third'],
            selected: 0,
            callback: function() { alert('Boring!'); }
          }
        */
        var settings = {
          selected: 0,
          callback: $.noop
        };
        $.extend(settings, options);

        var segmented;
        var labels = (settings.labels) ? settings.labels : [];
        var __selection;
        var __element;

        function createSegmentedButton() {
          var __segmented = ['<div class="segmented">'];
          labels.forEach(function(ctx, idx) {
            if (settings.selected === idx) {
              __segmented.push('<button role="radio" aria-checked="true" class="selected">');
              __selection = idx;
            } else {
              __segmented.push('<button role="radio">');
            }

            __segmented.push(ctx);
            __segmented.push('</button>');
          });
          __segmented.push('</div>');
          segmented = __segmented.join('');
          $(settings.element).append(segmented);
          if (__selection) __element = $(settings.element).find('button').eq(__selection)
        }
        createSegmentedButton();

        var callback = settings.callback;
        $(settings.element).on('tap', '.segmented > button', function(e) {
          var $this = $(this);
          if (this.parentNode.classList.contains('paging')) return;
          $this.siblings('button').removeClass('selected');
          $this.siblings('button').removeAttr('aria-checked');
          $this.addClass('selected');
          __selection = $this.index();
          __element = $(this);
          $this.attr('aria-checked', true);
          callback.call(this, e);
        });

        return {
          getSelection: function() {
            return {
              index: __selection,
              element: __element
            }
          }
        }
      }
    });
  });
})();
// Truck Body - Range Input
(function() {
  "use strict";
  $.fn.extend({
    //=====================
    // Setup a range input:
    //=====================
    Range: function() {
      if ($('body').hasClass('isWindows')) return;
      if (this[0].nodeName !== 'INPUT') return;
      var input = $(this);
      var newPlace;
      var width = input.width();
      var newPoint = (input.val() - input.attr("min")) / (input.attr("max") - input.attr("min"));
      var offset = -1.3;
      if (newPoint < 0) {
        newPlace = 0;
      } else if (newPoint > 1) {
        newPlace = width;
      } else {
        newPlace = width * newPoint + offset;
        offset -= newPoint;
      }
      if ($('body').hasClass('isAndroid') || $.isChrome) input.css({
        'background-size': Math.round(newPlace) + 'px 3px, 100% 3px'
      });
      else input.css({
        'background-size': Math.round(newPlace) + 'px 10px'
      });
    }
  });
  $(function() {
    $('input[type=range]').forEach(function(ctx) {
      $(ctx).Range();
    });
    $('body').on('input', 'input[type=range]', function() {
      $(this).Range();
    });
  });
})();
// Truck Body - Sheets
(function() {
  'use strict';
  $.extend({
    //========================
    // Create a sliding sheet:
    //========================
    Sheet: function(options) {
      /*
        var options {
          id : 'starTrek',
          background: 'transparent',
          handle: false,
          slideDown: false // default is slideUp
        }
      */
      if (!options) return;
      var settings = {
        id: $.uuid(),
        background: '',
        handle: true,
        slideDown: false
      };

      $.extend(settings, options);

      if (settings.background) settings.background = $.concat(' style="background-color:', settings.background, '" ');
      if (settings.slideDown) settings.slideDown = ' class="slideDown" ';
      if (settings.handle === false) settings.handle = '';
      else settings.handle = '<div class="handle"><span><svg width="100%" height="100%" viewBox="0 0 76 27" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:butt;stroke-linejoin:butt;stroke-miterlimit:1.41421;"><g id="sheet-handle" transform="matrix(1,0,0,1,-29.7966,-15.7797)"><path id="sheet-handle-path" d="M36.25,26.242L67.645,34.215L98.176,25.789" style="fill:none;"/></g></svg></span></div>';

      var sheet = $.concat('<sheet id="', settings.id, '"', settings.slideDown, settings.background, '>', settings.handle, '<section></section></sheet>');

      $('body').append(sheet);

      $('#' + settings.id).find('.handle').on($.eventStart, function() {
        $.HideSheet('#' + settings.id);
      });
    },
    ShowSheet: function(id) {
      var sheet = id ? id : '.sheet';
      $('screen.current').addClass('blurred');
      if ($.isAndroid || $.isChrome) {
        $(sheet).css('display', 'block');
        setTimeout(function() {
          $(sheet).addClass('opened');
        }, 20);
      } else {
        $(sheet).addClass('opened');
      }
    },
    HideSheet: function(id) {
      $(id).removeClass('opened');
      $('screen.current').addClass('removeBlurSlow');
      setTimeout(function() {
        $('screen').removeClass('blurred');
        $('screen').removeClass('removeBlurSlow');
      }, 500);
    }
  });
})();
// Truck Body - Paging
(function() {
  "use strict";
  $.extend({
    //========================
    // Setup a paging control:
    //========================
    Paging: function(options) {
      if (!options || !options.element) return;
      var screen = $(options.element);
      var pager = '<div class="pager">\n\
      <button class="previous">\n\
        <svg width="24px" height="36px" viewBox="0 0 24 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="pagination-icons" stroke="#979797"><path d="M19.7729197,3 L4.25431067,17.8699971 L19.7729196,32.9558941" id="page-previous"></path></g></g></svg>\n\
      </button>\n\
      <button class="next">\n\
        <svg width="24px" height="36px" viewBox="0 0 24 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="pagination-icons" stroke="#979797"><path d="M4.08862955,3.06871359 L20.0261609,18.0528447 L4.08862956,32.9999994" id="page-next"></path></g></g></svg>\n\
      </button>\n\
      </div>';

      $(screen).find('nav').append(pager);

      var currentSection = $(screen).find('section');

      var articles = function() {
        return currentSection.find('article').length;
      };
      $.AdjustNavbarLayout(screen);

      // Handle paging forward:
      var pageForward = function($this) {
        if (articles() < 2) return;
        $this.prev().removeClass('selected');
        $this.addClass('selected');
        var currentArticle;
        if ($this[0].classList.contains('disabled')) return;
        currentArticle = currentSection.find('article.current');
        if (currentArticle.index() === articles() - 1) {
          // start again!
          currentArticle.removeClass('current').addClass('next');
          currentArticle.siblings().removeClass('previous').addClass('next');
          currentSection.find('article').eq(0).addClass('current').removeClass('previous').removeClass('next');
        } else {
          currentArticle.removeClass('current').addClass('previous');
          currentArticle.next().removeClass('next').addClass('current');
        }
        setTimeout(function() {
          $this.removeClass('selected');
        }, 250);
      };

      var pageBack = function($this) {
        if (articles() === 1) return;
        $this.next().removeClass('selected');
        $this.addClass('selected');
        var currentArticle;
        currentArticle = currentSection.find('article.current');

        if (currentArticle.index() === 0) {
          currentArticle.removeClass('current');
          currentArticle.siblings().eq(-1).addClass('current').removeClass('next');
          currentArticle.siblings().eq(-1).siblings().removeClass('next').addClass('previous');
        } else {
          currentArticle.removeClass('current').addClass('next');
          currentArticle.prev().removeClass('previous').addClass('current');
        }
        setTimeout(function() {
          $this.removeClass('selected');
        }, 250);
      };

      $('.pager').on($.eventStart, 'button:last-of-type', function() {
        pageForward($(this));
      });
      $('.pager').on($.eventStart, 'button:first-of-type', function() {
        pageBack($(this));
      });

    }
  });
})();
// Tank Body - Stepper
(function() {
  'use strict';
  $.extend({
    //==================
    // Create a stepper:
    //==================
    Stepper: function(options) {
      if (!options) return;
      if (!options.element) return;
      if (!options.min) return;
      if (!options.max) return;

      var stepper = $(options.element);
      var min = options.min;
      var max = options.max;
      var defaultValue = options.defaultValue ? options.defaultValue : options.min;
      var increaseSymbol = '+';
      var decreaseSymbol = '-';
      if ($.isWin) {
        increaseSymbol = '';
        decreaseSymbol = '';
      }
      var decreaseButton = '<button class="decrease"><span>-</span></button>';
      var label = '<label>' + defaultValue + '</label><input type="text" value="' + defaultValue + '">';
      var increaseButton = '<button class="increase"><span>+</span></button>';
      stepper.append(decreaseButton + label + increaseButton);
      stepper.data('data-value', {
        min: min,
        max: max,
        defaultValue: defaultValue
      });

      var increaseStepperValue = function() {
        var currentValue = stepper.find('input').val();
        var value = stepper.data('data-value');
        var max = value.max;
        var newValue;
        if (currentValue >= max) {
          $(this).addClass('disabled');
        } else {
          newValue = Number(currentValue) + 1;
          stepper.find('button:first-of-type').removeClass('disabled');
          stepper.find('label').text(newValue);
          stepper.find('input')[0].value = newValue;
          if (currentValue === max) {
            $(this).addClass('disabled');
          }
        }
      };

      var decreaseStepperValue = function() {
        var currentValue = stepper.find('input').val();
        var value = stepper.data('data-value');
        var min = value.min;
        var newValue;
        if (currentValue <= min) {
          $(this).addClass('disabled');
        } else {
          newValue = Number(currentValue) - 1;
          stepper.find('button:last-of-type').removeClass('disabled');
          stepper.find('label').text(newValue);
          stepper.find('input')[0].value = newValue;
          if (currentValue === min) {
            $(this).addClass('disabled');
          }
        }
      };

      stepper.find('button:last-of-type').on('tap', function() {
        increaseStepperValue.call(this, stepper);
      });

      stepper.find('button:first-of-type').on('tap', function() {
        decreaseStepperValue.call(this, stepper);
      });

      return {
        getValue: function() {
          return stepper.find('input').val();
        }
      }
    }
  });
})();
// Tank Body - Popover
(function() {
  "use strict";
  $.extend({
    //=================================
    // Setup a popover (dropdown menu):
    //=================================
    Popover: function(options) {
      /*
        id: myUniqueID,
        title: 'Great',
        callback: myCallback,
      */
      options = options || {};
      var settings = {
        id: $.uuid(),
        callback: $.noop,
        title: '',
      };
      $.extend(settings, options);
      if (options && options.content) {
        settings.content = options.content;
      } else {
        settings.content = '';
      }
      var header = '<header><h1>' + settings.title + '</h1></header>';
      var popover = '<div class="popover" id="' + settings.id + '">' + header + '<section></section></div>';
      var popoverID = '#' + settings.id;

      // Calculate position of popover relative to the button that opened it:
      var __calcPopPos = function(element) {
        var offset = $(element).offset();
        var left = offset.left;
        var calcLeft;
        var calcTop;
        var popover = $(popoverID);
        var popoverOffset = popover.offset();
        calcLeft = popoverOffset.left;
        calcTop = offset.top + $(element)[0].clientHeight;
        if ((popover.width() + offset.left) > window.innerWidth) {
          popover.css({
            'left': ((window.innerWidth - popover.width()) - 20) + 'px',
            'top': (calcTop) + 25 + 'px'
          });
        } else {
          popover.css({
            'left': left + 'px',
            'top': (calcTop - 30) + 'px'
          });
        }
      };

      if ($('.mask')[0]) {
        $.ClosePopover();
        $('body').Unblock();
        return;
      }
      $.Block('.5');
      $('body').append(popover);
      if ($('body').hasClass('isAndroid')) {
        setTimeout(function() {
          $(popoverID).addClass('opened');
        }, 300);
      }
      if ($('body').hasClass('isWindows')) {
        $(popoverID).addClass('open');
      }
      $(popoverID).data('triggerEl', settings.trigger);
      $(popoverID).find('section').append(settings.content);
      settings.callback.call(settings.callback, settings.trigger);
      __calcPopPos(settings.trigger);

    },

    AlignPopover: function() {
      var popover = $('.popover');
      if (!popover.length) return;
      var triggerID = popover.data('triggerEl');
      var offset = $(triggerID).offset();
      var left = offset.left;
      if (($(popover).width() + offset.left) > window.innerWidth) {
        popover.css({
          'left': ((window.innerWidth - $(popover).width()) - 20) + 'px'
        });
      } else {
        popover.css({
          'left': left + 'px'
        });
      }
    },

    ClosePopover: function() {
      $.Unblock();
      $('.popover').css('visibility', 'hidden');
      setTimeout(function() {
        $('.popover').off();
        $('.popover').remove();
      }, 10);
    }
  });

  $(function() {
    /////////////////////////////////////////////////
    // Reposition popovers on window resize:
    /////////////////////////////////////////////////
    window.onresize = function() {
      $.AlignPopover();
    };
    var events = $.eventStart + ' singletap ' + $.eventEnd;
    $('body').on(events, '.mask', function(e) {
      if (!$('.popover')[0]) {
        if (e && e.nodeType === 1) return;
        // e.stopPropogation();
      } else {
        $.ClosePopover();
      }
    });
  });
})();
// Truck Body - Center Elements
(function() {
  "use strict";
  $.fn.extend({
    //============================
    // Center an Element on Screen
    //============================
    Center: function(position) {
      if (!this[0]) return;
      var $this = $(this);
      var parent = $this.parent();
      if (position) {
        $(this.css('position', position));
      } else if ($this.css('position') === 'absolute') {
        position = 'absolute';
      } else {
        position = 'relative';
      }
      var height, width, parentHeight, parentWidth;
      if (position === 'absolute') {
        height = $this[0].clientHeight;
        width = $this[0].clientWidth;
        parentHeight = parent[0].clientHeight;
        parentWidth = parent[0].clientWidth;
      } else {
        height = parseInt($this.css('height'), 10);
        width = parseInt($this.css('width'), 10);
        parentHeight = parseInt(parent.css('height'), 10);
        parentWidth = parseInt(parent.css('width'), 10);
        $(this).css({
          'margin-left': 'auto',
          'margin-right': 'auto'
        });
      }
      var tmpTop, tmpLeft;
      if (parent[0].nodeName === 'body') {
        tmpTop = ((window.innerHeight / 2) + window.pageYOffset) - height / 2 + 'px';
        tmpLeft = ((window.innerWidth / 2) - (width / 2) + 'px');
      } else {
        tmpTop = (parentHeight / 2) - (height / 2) + 'px';
        tmpLeft = (parentWidth / 2) - (width / 2) + 'px';
      }
      if (position !== 'absolute') tmpLeft = 0;
      $this.css({
        left: tmpLeft,
        top: tmpTop
      });
    }
  });
})();
// Truck Body - Activity Indicator
(function() {
  "use strict";
  $.fn.extend({
    //===========================
    // Setup activitiy indicator:
    //===========================
    Busy: function(options) {
      var settings = {
        size: 40,
        color: '#666',
        position: false
      };
      $.extend(settings, options);

      var $this = this;
      var spinner;
      // For iOS:
      var iOSBusy = function() {
        var small;
        if (parseInt(settings.size, 10) < 30) {
          spinner = "<svg class='truck-busy small' width='" + settings.size + "px' height='" + settings.size + "px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'>  <g x='0' y='0' width='100' height='100' fill='none' class='bk'><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(0 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(45 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(90 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(135 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(180 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(225 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(270 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(315 50 50) translate(0 -30)'></rect></g></svg>";
          $this.append(spinner);
        } else {
          spinner = "<svg class='truck-busy' width='" + settings.size + "px' height='" + settings.size + "px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' class='uil-default'> <g x='0' y='0' width='100' height='100' fill='none'><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(0 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(30 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(60 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(90 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(120 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(150 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(180 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(210 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(240 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(270 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(300 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(330 50 50) translate(0 -30)'></rect></g></svg>";
          $this.append(spinner);
        }
      };

      // For Android:
      var androidBusy = function() {
        settings.id = $.uuid();
        var androidActivityIndicator = null;
        var position = settings.position ? (' ' + settings.position) : '';
        if ($.isNativeAndroid) {
          androidActivityIndicator = '<svg class="truck-busy' + position + '" version="1.1" id="' + settings.id + '" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><g><path fill="none" stroke="' + settings.color + '" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M74.2,65c2.7-4.4,4.3-9.5,4.3-15c0-15.7-12.8-28.5-28.5-28.5S21.5,34.3,21.5,50c0,5.5,1.6,10.6,4.3,15"/></g><polyline fill="none" stroke="' + settings.color + '" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="89.4,56.1 74.3,65 65.4,49.9 "/></svg>';

          $this.append(androidActivityIndicator);
          return;
        } else {
          androidActivityIndicator = '<svg id="' + settings.id + '" class="truck-busy' + position + '" x="0px" y="0px" viewBox="0 0 100 100"><circle stroke="url(#SVGID_1_)" cx="50" cy="50" r="28.5"/></svg>';
          $this.append(androidActivityIndicator);
          $this.addClass('hasActivityIndicator');
          if (settings.position) {
            $('#' + settings.id).addClass(settings.position);
          }
          if (options.color) {
            $('#' + settings.id).find('circle').css('stroke', options.color);
          }
        }
        $('#' + settings.id).css({
          'height': settings.size + 'px',
          'width': settings.size + 'px'
        });
        return $('#' + settings.id);
      };

      // For Windows 8/WP8:
      var winBusy = function() {
        var spinner = $('<progress class="truck-busy"></progress>');
        $(spinner).css({
          'color': settings.color
        });
        $(spinner).attr('role', 'progressbar');
        $(spinner).addClass('win-ring');
        if (settings.position) $(spinner).addClass(settings.position);
        $this.append(spinner);
      };

      // Create Busy control for appropriate OS:
      if ($('body').hasClass('isWindows')) {
        winBusy(options);
      } else if ($('body').hasClass('isAndroid')) {
        androidBusy(options);
      } else if ($('body').hasClass('isiOS')) {
        iOSBusy(options);
      }
    }
  });
})();
