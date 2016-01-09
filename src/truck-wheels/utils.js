// Truck Wheels - Utilities Module:
(function() {
  "use strict";
  //==========================
  // Define Utilities methods:
  //==========================
  if (typeof jQuery !== 'undefined') return;
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
      var insertScript = function (script) {
        var firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode.insertBefore(script, firstScript);
      };
      var script = document.createElement("script");
      var done = false;
      var err;
      var loadScript;
      var handleError = function () {
        err = new Error(src || "EMPTY");
        loadScript();
      };
      var setupLoad = function (fn) {
        return function () {
          // Only call once.
          if (done) { return; }
          done = true;
          fn();
          if (callback) {
            callback.call(ctx, err);
          }
        };
      };

      loadScript = setupLoad(function () {
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
    }
  });
})();