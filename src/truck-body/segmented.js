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