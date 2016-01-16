// Tank Body - Slide Out Menu
(function() {
  'use strict';
  $.extend({
    //========================
    // Setup a slide out menu:
    //========================
    SlideOut: function() {
      var slideOutButton = $('<button class="slide-out-button"></button>');
      var slideOut = '<slideout><section></section></slideout>';
      $('body').prepend(slideOut);
      $('body').append(slideOutButton);
      // Get Slide Out & Slide Out button:
      var slideout = $('slideout');
      var slideOutBtn = $('button.slide-out-button');

      // Set up state for Slide Out and screens:
      slideout.attr('aria-hidden', true);
      $("screens").attr('aria-hidden', true);
      $("screens").eq(0).addClass('show').attr('aria-hidden', "false");

      // Handle Slide Out button events:
      slideOutBtn.on('tap', function() {
        $(this).toggleClass('focused');
        if (slideout.hasClass('open')) {
          slideout.removeClass('open');
          slideout.removeAttr('aria-hidden');
          $('button.back').removeClass('disabled').removeProp('disabled');
          $('button.backTo').removeClass('disabled').removeProp('disabled');
        } else {
          slideout.addClass('open')
          slideout.attr('aria-hidden', true);
          $('button.back').addClass('disabled').prop('disabled', true);
          $('button.backTo').addClass('disabled').prop('disabled', true);
        }
      });

      $('slideout').on('tap', 'li', function() {
        var menuItems = slideout.find('li[data-show]');
        slideout.attr('aria-hidden', 'true')

        // Toggle Slide Out button:
        slideOutBtn.toggleClass('focused');
        
        $('button.back').removeClass('disabled').removeProp('disabled');
        $('button.backTo').removeClass('disabled').removeProp('disabled');

        // This list item shows a single screen:
        menuItems.hazClass('selected').removeClass('selected');
        $.screens.hazClass('show').removeClass('show').attr('aria-hidden', true);
        var screenToShow = $(this).attr('data-show');
        $('#' + screenToShow.split(':')[0]).addClass('show').attr('aria-hidden', false);
        $('screen.current').addClass('next').removeClass('current');
        $('screen.previous').addClass('next').removeClass('previous');
        // Get route to dispatch:
        $.Router.dispatch(screenToShow);

        // Close slide out:
        slideout.removeClass('open');
      });

      return {
        populate: function(options) {
          var slideout = $('slideout');
          if (!slideout[0]) return;
          if (!options) {
            return;
          } else {
            slideout.find('section').append('<ul class="list"></ul>');
            var list = slideout.find('ul');
            options.forEach(function(ctx) {
              for (var key in ctx) {
                if (key === 'header') {
                  list.append('<li class="menu-header"><h2>' + ctx[key] + '</h2></li>');
                } else {
                  list.append('<li data-show="' + key + '"><h3>' + ctx[key] + '</h3></li>');
                }
              }
            });
            slideout.find('li').eq(0).addClass('selected');
          }
        }
      };
    }
  });
})();