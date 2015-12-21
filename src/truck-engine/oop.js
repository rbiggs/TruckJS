// Truck Engine - OOP Module:
(function() {
  "use strict";
  $.extend({

    // Mixin one object into another:
    //===============================
    mixin: function( sourceObj, targetObj ) {
      for (var key in sourceObj) {
        // Do not replace property if it exists:
        if (!(key in targetObj)) {
            targetObj[key] = sourceObj[key];
        }
      }
      return targetObj;
    },

    // Create a clone of an object.
    // This preserves the protytpe chain 
    // to the original:
    //==================================
    clone: function(obj) {
      if (typeof Object.create != 'function') {
        Object.create = (function() {
          function Temp() {}
          var hasOwn = Object.prototype.hasOwnProperty;

          return function (O) {
            if (typeof O != 'object') {
              throw TypeError('Object prototype may only be an Object or null');
            }
            Temp.prototype = O;
            var obj = new Temp();
            Temp.prototype = null;
            if (arguments.length > 1) {
              var Properties = Object(arguments[1]);
              for (var prop in Properties) {
                if (hasOwn.call(Properties, prop)) {
                  obj[prop] = Properties[prop];
                }
              }
            }
            return obj;
          };
        })();
      }
      return Object.create(obj);
    },

    // Define Modules with dependencies.
    //==================================
    Modules: (function Manager() {

      // Hold defined modules here:
      var modules = {};

      // dependencies is an array of quoted names.
      // implementatoin is a revealing module that returns a function.
      function add(name, dependencies, implementation) {
        if ($.type(dependencies) === 'function' && !implementation) {
          implementation = dependencies;
          dependencies = [];
        }
        var depLen = dependencies.length;
        for (var i = 0; i < depLen; i++) {
          dependencies[i] = modules[dependencies[i]];
        }
        modules[name] = implementation.apply( implementation, dependencies );
      }

      // Execute the named module:
      function run(name) {
        return modules[name];
      }

      // Delete a module:
      function remove(module) {
        delete(modules[module]);
      }

      // Expose Modules methods:
      return {
        add: add,
        run: run,
        remove: remove
      };
    })()
  });
})();