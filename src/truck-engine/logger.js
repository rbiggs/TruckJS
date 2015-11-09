// Truck Engine - Logging Module:
(function() {
  "use strict";
  $.extend({
    Logger: function(options) {
      var __models;
      var __views;
      var __mediators;
      var __report = {
        models: {},
        veiws: {},
        mediators: {}
      }

      if (!options) return;
      __models = options.models;
      __views = options.views;
      __mediators = options.mediators;

      function logModels () {
        if (__models && __models.length) {
          __models.forEach(function(model) {
            var model = mode.getHandle();
            __report[model].size = model.size();
            __report[model].type = model.getType();
            __report[model].getLastModTime = model.getLastModTime();
            __report[model].isBoxed = model.isBoxed();
            __report[model].isAutoBoxed = model.isAutoBoxed();
            __report[model].lastModTime = model.getLastModTime();
          });
        }
      }

      function logViews () {
        if (__views && __views.length) {
          __views.forEach(function(view) {
            var view = view.getViewName();
            __report[view].lastRenderTime = view.getLastRenderTime();
            __report[view].isStopped = view.isStopped();
            __report[view].isExcapingHTML = view.isEscapingHTML();
            __report[view].boundToModel = view.getModel() ? view.getModel().getHandle() : false;
            __report[view].renderCount = view.getRenderCount();
          });
        }
      }

      function logControllers () {
        if (__mediators && __mediators.length) {
          __mediators.forEach(function(mediator) {
            var mediator = mediator.getHandle();
            __report[mediator].isStopped = mediator.isStopped();
            __report[mediator].hasBeenKilled = mediator.hasBeenKilled();
            __report[mediator].count = mediator.getCount();
          });
        }
      }

      function logBox () {
        $.Box.length(function(len) {

        }).then(function() {

        });
      }

      return {
        getLog: function() {
          // 60*24*30
        },

        box: function(options) {

        }
      }
    }
  });
})();