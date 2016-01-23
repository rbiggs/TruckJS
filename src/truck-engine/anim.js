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