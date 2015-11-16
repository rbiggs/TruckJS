// Truck Body - Popup
(function() {
  'use strict';
  $.extend({
    //=======================
    // Setup  a popup dialog:
    //=======================
    Popup: function(options) {
      /*
      options {
        id: 'alertID',
        title: 'Alert',
        message: 'This is a message from me to you.',
        cancelButton: 'Cancel',
        continueButton: 'Go Ahead',
        width: '100px',
        callback: function() { // do something },
        empty: true
      }
      */
      if (!options) return;
      var settings = {};
      settings.id = $.uuid();
      settings.content = true;
      $.extend(settings, options);
      var width = '';
      if (settings.width) {
        width = ' style="width:' + settings.width + 'px;" ';
      }

      var id = settings.id;
      var title = settings.title ? '<header><h1>' + settings.title + '</h1></header>' : '';
      var message = settings.message ? '<p role="note">' + options.message + '</p>' : '';
      var cancelButton = options.cancelButton ? '<button class="cancel" role="button">' + settings.cancelButton + '</button>' : '';
      var continueButton = settings.continueButton ? '<button class="continue" role="button">' + settings.continueButton + '</button>' : '';
      var callback = settings.callback || $.noop;
      var panelOpen, panelClose, popup;
      if (settings.empty) {
        popup = $.concat('<div' + width + ' class="popup closed" role="alertdialog" id="', id, '"></div>');
      } else {
        popup = $.concat('<div class="popup closed', '" role="alertdialog" id="', id, '"><div class="panel">', title, message, '</div><footer>', cancelButton, continueButton, '</footer>', panelClose, '</div>');
      }

      $('body').append(popup);
      if (callback && continueButton) {
        $('.popup').find('.continue').on($.eventStart, function() {
          var $this = $(this);
          if ($.isAndroid || $.isChrome) {
            $this.addClass('selected');
            setTimeout(function() {
              $this.removeClass('selected');
              $('.popup').ClosePopup();
              callback.call(callback);
            }, 300);
          } else {
            $('.popup').ClosePopup();
            callback.call(callback);
          }
        });
        $('.popup').find('.cancel').on($.eventStart, function() {
          var $this = $(this);
          if ($.isAndroid || $.isChrome) {
            $this.addClass('selected');
            setTimeout(function() {
              $this.removeClass('selected');
              $('.popup').ClosePopup();
            }, 300);
          } else {
            $('.popup').ClosePopup();
          }
        });
      }

      $.CenterPopup();
      var events = $.eventStart + ' tap ' + $.eventEnd;
      $('.mask').on(events, function(e) {
        e.stopPropagation();
      });
    },

    // Hanle Orientation Change:
    //==========================
    CenterPopup: function() {
      var popup = $('.popup');
      if (!popup[0]) return;
      var tmpTop = ((window.innerHeight / 2) + window.pageYOffset) - (popup[0].clientHeight / 2) + 'px';
      var tmpLeft;
      if (window.innerWidth === 320) {
        tmpLeft = '10px';
      } else {
        tmpLeft = Math.floor((window.innerWidth - popup[0].clientWidth) / 2) + 'px';
      }
      if ($('body').hasClass('isWindows')) {
        popup.css({
          top: tmpTop
        });
      } else {
        popup.css({
          left: tmpLeft,
          top: tmpTop
        });
      }
    }
  });
  $.fn.extend({
    // Show Popup:
    //============
    ShowPopup: function() {
      $.Block('0.5');
      $(this).removeClass('closed');
      $(this).addClass('opened');
      $.CenterPopup();
    },

    // Close Popup:
    //=============
    ClosePopup: function() {
      $.Unblock();
      $(this).removeClass('opened');
      $(this).addClass('closed');
    }
  });

  // Reposition popups on window resize:
  //====================================
  $(function() {
    window.onresize = function() {
      $.CenterPopup();
    };
  });
})();