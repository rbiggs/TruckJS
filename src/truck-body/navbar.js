// Truck Body - Adjust Navbar for iOS
(function() {
  $(function() {
    "use strict";
    //===============================
    // Method to center H1 in Navbar.
    // Check on widths of siblings:
    //===============================
    $.extend({
      AdjustNavbarLayout: function(screen) {
        if (!$('link[href*=ios]')[0]) return;
        screen = $(screen);
        var h1 = screen.find('h1');
        var siblings = h1.siblings();
        var whichSide;
        var oppositeSide;
        var rtl = ($('html').attr('dir') === 'rtl');
        var amount = 0;
        var hidden = false;
        var visibleSibling;

        var calculateLongest = function(a, b) {
          var widthA = a[0].clientWidth;
          var widthB = b[0].clientWidth;
          if (!widthA) {
            widthA = 0;
            whichSide = 'margin-right';
            oppositeSide = 'margin-left';
            if (rtl) {
              whichSide = 'margin-left';
              oppositeSide = 'margin-right';
            }
          }
          if (!widthB) {
            widthB = 0;
            whichSide = 'margin-left';
            oppositeSide = 'margin-right';
            if (rtl) {
              whichSide = 'margin-right';
              oppositeSide = 'margin-left';
            }
          }
          if (widthB > widthA) {
            whichSide = 'margin-left';
            oppositeSide = 'margin-right';
            if (rtl) {
              whichSide = 'margin-right';
              oppositeSide = 'margin-left';
            }
            amount = (widthB - widthA);
          } else if (widthA > widthB) {
            whichSide = 'margin-right';
            oppositeSide = 'margin-left';
            if (rtl) {
              whichSide = 'margin-left';
              oppositeSide = 'margin-right';
            }
            amount = (widthA - widthB);
          } else {
            amount = 0;
          }
        };

        function handleOneSibling(sib) {
          var sibling = sib || h1.siblings();
          amount = sibling[0].clientWidth;
          if (sibling.is(':first-child')) {
            whichSide = 'margin-right';
            oppositeSide = 'margin-left';
            if (rtl) {
              whichSide = 'margin-left';
              oppositeSide = 'margin-right';
            }
          } else if (sibling.is(':last-child')) {
            whichSide = 'margin-left';
            oppositeSide = 'margin-right';
            if (rtl) {
              whichSide = 'margin-right';
              oppositeSide = 'margin-left';
            }
          }
        }

        // If one sibling:
        if (siblings.length === 1) {
          handleOneSibling();

          // If two siblings:
        } else if (siblings.length === 2) {
          siblings.forEach(function(item) {
            if ($(item).css('display') === 'none') {
              hidden = true;
            } else {
              visibleSibling = $(item);
            }
          });
          if (hidden) {
            handleOneSibling(visibleSibling);
          } else {
            calculateLongest(siblings.eq(0), siblings.eq(1));
          }

          // H1 is alone:
        } else {
          whichSide = 'margin-left';
          oppositeSide = 'margin-right';
          amount = 0;
        }
        var props = {};
        props[whichSide] = amount;
        // props[oppositeSide] = 0;
        var sibwidth = 0;
        if (siblings.size()) {
          siblings.forEach(function(item) {
            sibwidth += $(item)[0].clientWidth;
          });
        }
        // alert(amount)
        var headerWidth = screen.find('nav').width() / 2;
        if ((sibwidth + 20) > headerWidth) {
          h1.css({
            'margin-left': 0,
            'margin-right': 0
          });
        } else {
          h1.css(props);
        }
      }
    });
    setTimeout(function() {
      $('screen').forEach(function(screen) {
        $.AdjustNavbarLayout(screen);
      });
    });
  });
})();