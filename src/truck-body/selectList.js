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