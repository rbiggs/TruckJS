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

    concat : function ( args ) {
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