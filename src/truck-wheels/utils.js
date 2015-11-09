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