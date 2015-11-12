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
        this.forEach(function(node) {
          node.innerHTML = '';
        });
      } else if (content) {
        this.forEach(function(node) {
          node.innerHTML = content;
        });
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