// Truck Body - Sheets
(function() {
  'use strict';
  $.extend({
    Sheet: function(options) {
      /*
        var options {
          id : 'starTrek',
          background: 'transparent',
          handle: false,
          slideDown: false // default is slideUp
        }
      */
      if (!options) return;
      var settings = {
        id: $.uuid(),
        background: '',
        handle: true,
        slideDown: false
      };

      $.extend(settings, options);

      if (settings.background) settings.background = $.concat(' style="background-color:', settings.background, '" ');
      if (settings.slideDown) settings.slideDown = ' class="slideDown" ';
      if (settings.handle === false) settings.handle = '';
      else settings.handle = '<div class="handle"><span><svg width="100%" height="100%" viewBox="0 0 76 27" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:butt;stroke-linejoin:butt;stroke-miterlimit:1.41421;"><g id="sheet-handle" transform="matrix(1,0,0,1,-29.7966,-15.7797)"><path id="sheet-handle-path" d="M36.25,26.242L67.645,34.215L98.176,25.789" style="fill:none;"/></g></svg></span></div>';

      var sheet = $.concat('<sheet id="', settings.id, '"', settings.slideDown, settings.background, '>', settings.handle, '<section></section></sheet>');

      $('body').append(sheet);

      $('#' + settings.id).find('.handle').on($.eventStart, function() {
        $.HideSheet('#' + settings.id);
      });
    },
    ShowSheet: function(id) {
      var sheet = id ? id : '.sheet';
      $('screen.current').addClass('blurred');
      if ($.isAndroid || $.isChrome) {
        $(sheet).css('display', 'block');
        setTimeout(function() {
          $(sheet).addClass('opened');
        }, 20);
      } else {
        $(sheet).addClass('opened');
      }
    },
    HideSheet: function(id) {
      $(id).removeClass('opened');
      $('screen.current').addClass('removeBlurSlow');
      setTimeout(function() {
        $('screen').removeClass('blurred');
        $('screen').removeClass('removeBlurSlow');
      }, 500);
    }
  });
})();