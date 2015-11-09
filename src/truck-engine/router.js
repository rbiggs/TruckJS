// Truck Engine - Router Module:
(function() {
  "use strict";
  $(function() {
    $.extend({
      TruckRoutes: $.Model([], 'Truck-Routes'),

      Router: function() {

        var TruckRouteCntrl = $.Mediator('Truck-Routes');

        return {
          addRoute: function(options) {
            if ($.type(options) === 'array') {
              options.forEach(function(item) {
                if (!$.mediators[item.route]) {
                  $.mediators[item.route] = $.Stack();
                  $.mediators[item.route].push({
                    token: $.uuid(),
                    callback: item.callback,
                    exec: true,
                    count: 0,
                    start: 0,
                    after: 0,
                    time: 0
                  });
                }
              });
            }
          },

          getFullRoute: function() {
            return $.TruckRoutes.getData().join('/');
          },

          getRoutesStack: function() {
            return $.TruckRoutes.getData();
          },

          getCurrentLoc: function() {
            var temp = this.getFullRoute().split('/');
            return temp[temp.length - 1];
          },

          dispatch: function(route) {
            var temp;
            var id;
            if (route.match(/\:/)) {
              temp = route.split(':');
              id = temp[1];
              route = temp[0];
            }
            if ($.mediators[route]) {
              $.mediators[route].getData()[0].callback(id);
            }
          },

          pushRoute: function(route) {
            $.TruckRoutes.push(route);
          },

          popRoute: function() {
            return $.TruckRoutes.pop();
          },

          unshiftRoute: function(route) {
            $.TruckRoutes.unshift(route);
          },

          shiftRoute: function() {
            return $.TruckRoutes.shift();
          },

          insert: function(position, route) {
            if ($.TruckRoutes.size() >= position) {
              $.TruckRoutes.push(route);
            } else {
              $.TruckRoutes.splice(position, 0, route);
            }
          },

          eq: function(number) {
            return $.TruckRoutes.eq(number);
          },

          indexOf: function(route) {
            return $.TruckRoutes.indexOf(route);
          },

          delete: function(route) {
            $.TruckRoutes.delete(route);
          }

        };
      }
    });

    $.extend($.Router, {
      dispatch: function(route) {
        if (!route) return;
        var temp;
        var id;
        if (route.match(/\:/)) {
          temp = route.split(':');
          id = temp[1];
          route = temp[0];
        }
        if ($.mediators[route]) {
          $.mediators[route].getData()[0].callback(id);
        }
      }
    });

    $.extend($.TruckRoutes, {
      getFullRoute: function() {
        return this.getData().join('/');
      }
    });

    // Set up initial route:
    if ($('screen').size()) {
      $.TruckRoutes.push($('screen')[0].id, true);
    }

  });
})();