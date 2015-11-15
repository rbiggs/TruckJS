// Truck Body - Multi-Select List
(function() {
  'use strict';
  $.extend({
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
      var multiSelectIcon = '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="multi-select-icon" stroke="#979797"><g id="multi-select-circle-+-mulit-select-checkmark" transform="translate(2.000000, 2.000000)"><circle id="multi-select-circle" cx="13" cy="13" r="13"></circle><path d="M4.71521456,15.9877529 L13.0000002,20.7028494 L19.977049,5.70284941" id="mulit-select-checkmark"></path></g></g></g></svg>';
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

        if (selections.length) {
          selections.forEach(function(sel) {
            if (sel === idx) {
              ctx.setAttribute('aria-checked', 'true');
              ctx.classList.add('selected');
              if (!$(ctx).find('input')[0]) {
                $(ctx).append('<input type="checkbox" checked="checked" name="' + name + '" value="' + value + '">');
              } else {
                $(ctx).find('input').prop('checked', true).attr('value', value);
              }
              __selection.push({
                index: sel,
                value: value
              });
            }
          });

        } else {
          if (!$(ctx).find('input')[0]) {
            $(ctx).append('<input type="checkbox" name="' + name + '" value="' + value + '">');
          }
        }
      });

      list.on('tap', 'li', function() {
        var item = $(this);
        if (item.hasClass('selected')) {
          item.removeClass('selected').removeAttr('aria-checked');
          item.find('input').removeProp('checked');
          var whichItem = item.index();
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