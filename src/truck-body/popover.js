// Tank Body - Popover
(function() {
  "use strict";
  $.extend({
    /*
      id: myUniqueID,
      title: 'Great',
      callback: myCallback,
    */
    Popover: function(options) {
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