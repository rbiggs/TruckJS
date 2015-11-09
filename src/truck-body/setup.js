// Truck Body - Setup
(function() {
  "use strict";
  $(function() {
    if (!/(mobile)|(ios)|(android)/img.test(navigator.userAgent)) {
      $('body').addClass('isDesktop');
    }
    if ($('link[href*=ios]')[0]) {
      $('body').addClass('isiOS');
      $.AdjustNavbarLayout();
    } else if ($('link[href*=android]')[0]) {
      $('body').addClass('isAndroid');
    } else if ($('link[href*=windows]')[0]) {
      $('body').addClass('isWindows');
    }
  });
})();