// Truck Body - Navigation Module
(function() {
  $(function() {
    // Private variable to track navigation state:
    var isNavigating = false;
    // get screen by id:
    var getScreen = function(screen) {
      return $('#' + screen);
    };
    // Handle state of screens:
    var makeScreenCurrent = function(screen) {
      screen = $(screen);
      screen.addClass('current');
      screen.removeClass('previous');
      screen.removeClass('next');
    };
    var makeScreenPrevious = function(screen) {
      screen = $(screen);
      screen.removeClass('current');
      screen.removeClass('next');
      screen.addClass('previous');
    };
    var makeScreenNext = function(screen) {
      screen = $(screen);
      screen.removeClass('current');
      screen.removeClass('previous');
      screen.addClass('next');
    };

    $.extend({

      ///////////////////////////////
      // Navigate to Specific Article
      ///////////////////////////////
      GoToScreen: function(destination) {
        if (isNavigating) return;
        isNavigating = true;
        $.TruckRoutes.push(destination);
        var currentScreen = $.screens.getCurrent();
        var destinationScreen = (function() {
          var temp;
          var regex = /:/img;
          temp = regex.test(destination) ?
            destination.split(':')[0] : destination;
          return getScreen(temp);
        })();
        if (currentScreen[0]) currentScreen[0].scrollTop = 0;
        if (destinationScreen[0]) destinationScreen[0].scrollTop = 0;
        makeScreenPrevious(currentScreen);
        makeScreenCurrent(destinationScreen);
        $.Router.dispatch(destination);
        setTimeout(function() {
          isNavigating = false;
        }, 500);
      },

      ////////////////////////////////////
      // Navigate Back to Previous Article
      ////////////////////////////////////
      GoBack: function() {
        var currentScreen = $.screens.getCurrent();
        $.TruckRoutes.pop();
        var destination = $.TruckRoutes.eq(-1);
        var destinationScreen = getScreen(destination);
        if ($.TruckRoutes.size() === 0) {
          destination = $.screens.eq(0);
          $.TruckRoutes.push(destination[0].id);
        }
        if (currentScreen[0]) currentScreen[0].scrollTop = 0;
        if (destinationScreen[0]) destinationScreen[0].scrollTop = 0;
        $.Router.dispatch(destination);
        makeScreenNext(currentScreen);
        makeScreenCurrent(destinationScreen);
        if ($.TruckRoutes.size() === 1) return;
        $.TruckRoutes.pop();
      },

      isNavigating: false,

      //////////////////////////////////////
      // Navigate Back to Non-linear Article
      //////////////////////////////////////
      GoBackToScreen: function(destination) {
        var currentScreen = $.screens.getCurrent();
        var position = $.TruckRoutes.index(destination);
        var destinationScreen = getScreen(destination);
        makeScreenCurrent(destinationScreen);
        var temp;
        while ($.TruckRoutes.size() > position + 1) {
          temp = $.TruckRoutes.pop();
          temp = getScreen(temp);
          makeScreenNext(temp);
        }
      },
    });


    ///////////////////////////////////////////////////////////
    // Make sure that navs and articles have navigation states:
    ///////////////////////////////////////////////////////////

    ///////////////////////////
    // Initialize Back Buttons:
    ///////////////////////////
    $('body').on('tap', '.back', function() {
      if (this.hasAttribute('disabled')) return;
      $.GoBack();
    });

    ////////////////////////////////
    // Handle navigation list items:
    ////////////////////////////////

    var handleNavigationEvent = function(element) {
      element = $(element);
      if ($.isNavigating) return;
      if (!element.hazAttr('data-goto')[0]) return;
      if (element.closest('ul').is('.deletable')) return;
      element.addClass('selected');
      var destination = element.attr('data-goto');
      setTimeout(function() {
        element.removeClass('selected');
      }, 1000);
      // Handle navigation:
      if ($.isAndroid || $.isChrome) {
        setTimeout(function() {
          $.GoToScreen(destination);
        }, 200);
      } else {
        $.GoToScreen(destination);
      }
    };
    $('body').on('tap', 'li', function() {
      handleNavigationEvent($(this));
    });
    $('body').on('doubletap', 'li', function() {
      if (!$.isNavigating) {
        handleNavigationEvent($(this));
      }
    });
  });
})();