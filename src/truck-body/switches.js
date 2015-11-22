// Truck Body - Switches
(function() {
  "use strict";
  $.extend({
    //=========================
    // Create a switch control:
    //=========================
    Switch: function(options) {
      var self = this;
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