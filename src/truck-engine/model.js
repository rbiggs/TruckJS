// Truck Engine - Model Module:
(function() {
  "use strict";
  $.extend({
    Model: function(data, handle) {
      // Define handle name:
      var __handle = handle || $.uuid();
      // Init private data:
      var __data = data || '';
      data = null;

      // Used for boxing a model:
      var __name;
      var __boxName;
      var __key;
      var __autobox = false;
      var __lastBoxTime;
      var __lastModifiedTime = 0;

      var checkPublicationName = function(__handle) {
        return typeof __handle === 'string';
      };

      var propagateDataLoop = function(handle, data) {
        if ($.mediators[handle]) {
          $.mediators[handle].forEach(function(cntrl) {
            cntrl.callback.call(cntrl.callback, data);
          });
        }
      };

      var propogateData = function(__handle, data, doNotPropogate) {
        if (!doNotPropogate) {
          propagateDataLoop(__handle, data);
        } else if (doNotPropogate && checkPublicationName(doNotPropogate) === 'string') {
          propagateDataLoop(doNotPropogate, data);
        }
      };

      // Return closure to encapsulate data:
      return {

        key: function() {
          return __key;
        },

        // Get size of array data:
        size: function() {
          if (this.hasData() && this.isIterable()) {
            return __data.length;
          }
        },

        // Define getter:
        eq: function(prop) {
          if (Array.isArray(__data)) {
            if (__data && isNaN(prop)) {
              return __data[prop];
            } else if (__data && !isNaN(prop) && prop < 0) {
              return __data[__data.length - 1];
            } else if (__data && !isNaN(prop) && prop > -1) {
              return __data[prop];
            }
          } else if (this.hasData()) {
            return __data[prop];
          }
        },

        // Allow setting a property value on an object.
        // This is for objects that are not iterable.
        setProp: function(prop, value, doNotPropogate) {
          if (!prop || (this.hasData() && this.isIterable())) {
            return;
          }
          if (!__data) {
            __data = {};
            __data[prop] = value;
            propogateData(__handle, __data, doNotPropogate);
          } else {
            __data[prop] = value;
            propogateData(__handle, __data, doNotPropogate);
          }
          __lastModifiedTime = Date.now();
        },

        // Get a property on an object.
        // This is for objects that are not iterable.
        getProp: function(prop) {
          if (!prop || (this.hasData() && this.isIterable())) {
            return;
          } else {
            return __data[prop];
          }
        },

        // Replace a single object with another.
        // This is for objects that are not iterable.
        setObject: function(obj, doNotPropogate) {
          if (!obj || (this.hasData() && this.isIterable())) {
            return;
          }
          __data = obj;
          __lastModifiedTime = Date.now();
          propogateData(__handle, __data, doNotPropogate);
        },

        // Define push for collections.
        // Add item to end of collection:
        push: function(data, doNotPropogate) {
          if (!data) return;
          var self = this;
          if (Array.isArray(__data)) {
            __data.push(data);
            __lastModifiedTime = Date.now();
            propogateData(__handle, data, doNotPropogate);
            if (__autobox) {
              self.box({
                key: __key
              });
            }
          }
        },

        // Define pop for collections.
        // Remove item from end of collection:
        pop: function(doNotPropogate) {
          var self = this;
          if (this.hasData() && this.isIterable()) {
            var data = __data.pop();
            __lastModifiedTime = Date.now();
            propogateData(__handle, data, doNotPropogate);
            if (__autobox) {
              self.box({
                key: __key
              });
            }
            return data;
          }
        },

        // Unshift for collections.
        // Add item to beginning of collection:
        unshift: function(data, doNotPropogate) {
          if (!data) return;
          var self = this;
          if (Array.isArray(__data)) {
            __data.unshift(data);
            __lastModifiedTime = Date.now();
            propogateData(__handle, data, doNotPropogate);
            if (__autobox) {
              self.box({
                key: __key
              });
            }
          }
        },

        // Shift for collections.
        // Remove item from beginning of collection:
        shift: function(doNotPropogate) {
          var self = this;
          if (this.hasData() && this.isIterable()) {
            var __d = __data.shift();
            __lastModifiedTime = Date.now();
            propogateData(__handle, __d, doNotPropogate);
            if (__autobox) {
              self.box({
                key: __key
              });
            }
            return __d;
          }
        },

        // Define concat for collections.
        // Merge one array into view model:
        concat: function(data, doNotPropogate) {
          if (!data) return;
          var self = this;
          if (Array.isArray(__data)) {
            __data = __data.concat(data);
            __lastModifiedTime = Date.now();
            propogateData(__handle, __data, doNotPropogate);
            if (__autobox) {
              self.box({
                key: __key
              });
            }
          }
        },

        // Define insert for collections.
        // Insert data at position:
        insert: function(position, data, doNotPropogate) {
          if (!position) return;
          var self = this;
          if (this.hasData() && this.isIterable()) {
            var len = data.length;
            __data.splice(position, 0, data);
            __lastModifiedTime = Date.now();
            propogateData(__handle, data, doNotPropogate);
          } else {
            __data.splice(position, 0, data);
            __lastModifiedTime = Date.now();
            propogateData(__handle, data, doNotPropogate);
          }
          if (__autobox) {
            self.box({
              key: __key
            });
          }
        },

        // Define unique for collections.
        // Remove duplicates from view model:
        unique: function(doNotPropogate) {
          var len = __data.length;
          var ret = [];
          var obj = {};
          var self = this;

          if (this.hasData() && this.isIterable()) {
            for (var i = 0; i < len; i++) {
              var arrayItem = JSON.stringify(__data[i]);
              var arrayItemValue = __data[i];
              if (obj[arrayItem] === undefined) {
                ret.push(arrayItemValue);
                obj[arrayItem] = 1;
              } else {
                obj[arrayItem]++;
              }
            }
            __lastModifiedTime = Date.now();
            __data = ret;
          }
          if (doNotPropogate) {
            if (checkPublicationName(doNotPropogate)) {
              $.mediators[doNotPropogate].forEach(function(handle) {
                handle.callback.call(handle.callback, data);
              });
            }
          } else {
            $.dispatch(__handle, __data);
          }
          if (__autobox) {
            self.box({
              key: __key
            });
          }
        },

        // Get the index of data from a collection:
        index: function(prop, value) {
          if (this.hasData() && this.isIterable()) {
            if (value) {
              for (var i = 0; i < __data.length; i++) {
                if (__data[i][prop] === value) {
                  return i;
                }
              }
            } else {
              return __data.indexOf(prop);
            }
          }
          return;
        },

        // Filter the data of a collection:
        filter: function(args) {
          if (this.hasData() && this.isIterable()) {
            return __data.filter.apply(__data, arguments);
          }
        },

        // Map the data of a collection:
        map: function(args) {
          if (this.hasData() && this.isIterable()) {
            return __data.map.apply(__data, arguments);
          }
        },

        // Pluck the property value from a collection:
        pluck: function(property) {
          if (!property) return;
          var ret = [];
          if (this.hasData() && this.isIterable()) {
            var len = this.size();
            for (var i = 0; i < len; i++) {
              ret.push(__data[i][property]);
            }
            return ret;
          }
        },

        sort: function(args) {
          __lastModifiedTime = Date.now();
          return __data.sort.call(__data, args);
        },

        reverse: function(args) {
          var self = this;
          __lastModifiedTime = Date.now();
          __data.reverse();
          if (__autobox) {
            self.box({
              key: __key
            });
          }
        },

        // Sort the data of a collection:
        sortBy: function(props) {
          var orderBy = function(args) {
            var props = arguments;
            return function(a, b) {
              var sortByProperty = function(property) {
                // Default sort order:
                var sortOrder = 1;
                // If user provided property 
                // with "-" prefix, make
                // sort order descending:
                if (property[0] === "-") {
                  sortOrder = -1;
                  // Extract property from hyphen prefix:
                  property = property.substr(1);
                }
                // Sort objects by provided properties:
                //=====================================
                return function(a, b) {
                  var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                  return result * sortOrder;
                };
              };

              // Loop over all properties and sort
              // objects based on those properties:
              //===================================
              var i = 0;
              var result = 0;
              var numberOfProperties = props.length;
              while (result === 0 && i < numberOfProperties) {
                // Use the private function to compare two values:
                //================================================
                result = sortByProperty(props[i])(a, b);
                i++;
              }
              __lastModifiedTime = Date.now();
              return result;
            };
          };
          if (this.hasData() && this.isIterable()) {
            return __data.sort(orderBy.apply(null, arguments));
          }
        },

        // Enable user to delete either and object property,
        // or an index of a collection;
        delete: function(data, doNotPropogate) {
          var pos;
          if (!data) return;
          var self = this;
          if (this.hasData() && this.isIterable()) {
            pos = __data.indexOf(data);
            __data.splice(pos, 1);
            __lastModifiedTime = Date.now();
          } else if (this.hasData()) {
            __lastModifiedTime = Date.now();
            delete __data[data];
          }
          propogateData(__handle, __data, doNotPropogate);
          if (__autobox) {
            self.box({
              key: __key
            });
          }
        },

        // Enable callback execution with model:
        run: function(callback) {
          callback.call(callback, this, __data);
        },

        // For the model to announce its current data state:
        poke: function() {
          if (this.hasData() && this.isIterable() && __handle) {
            $.mediators[__handle].forEach(function(handle) {
              handle.callback.call(handle.callback, data);
            });
          }
        },

        // Get the current model handle:
        getHandle: function() {
          return __handle;
        },

        // Set the handle that the model uses.
        // If a handle was set up at initialization,
        // it will be replace with this handel
        setHandle: function(handle) {
          if (handle && typeof handle === 'string') {
            __handle = handle;
          }
        },

        // Delete all data in the model:
        purge: function() {
          var self = this;
          if ($.type(__data) === 'array') {
            __data.length = 0;
          } else if ($.type(__data) === 'object') {
            for(k in __data) if(!(__data[k] instanceof Function)) delete __data[k];
          }
          if (__autobox) {
            self.box({
              key: __key
            });
          }
        },

        // Determine if the model has any data:
        hasData: function() {
          if (__data) {
            return true;
          } else {
            return false;
          }
        },

        // Returns whether the model's data is
        // an array or an object:
        getType: function() {
          if (Array.isArray(__data)) {
            return 'array';
          } else if (typeof __data === 'object') {
            return 'object';
          } else {
            return;
          }
        },

        isIterable: function() {
          if (Array.isArray(__data)) {
            return true;
          } else {
            return false;
          }
        },

        forEach: function(callback) {
          if (this.hasData() && this.isIterable()) {
            var value;
            var i = -1;
            var len = __data.length;
            while (++i < len) {
              value = callback.call(__data[i], __data[i], i);
              if (value === false) {
                break;
              }
            }
          }
        },

        // Get all current data from model:
        getData: function() {
          if (this.hasData()) {
            return __data;
          }
        },

        // Set a value on an object property in a stack,
        // or replace the object with another:
        setItemProp: function(index, prop, value, doNotPropogate) {
          var self = this;
          if (this.hasData() && this.isIterable()) {
            if (isNaN(index)) return;
            if (!isNaN(index) && value) {
              __data[index][prop] = value;
              __lastModifiedTime = Date.now();
              propogateData(__handle, __data, doNotPropogate);
            } else if (prop && !value) {
              // __data[index][prop];
              __data.splice(index, 1, prop);
              __lastModifiedTime = Date.now();
              propogateData(__handle, __data, doNotPropogate);
            }
          } else {
            __data[index] = prop;
            __lastModifiedTime = Date.now();
            propogateData(__handle, __data, value);
          }
          if (__autobox) {
            self.box({
              key: __key
            });
          }
        },

        // Get the value of a property on an object in a stack,
        // or get the whole object at that index.
        getItemProp: function(index, prop) {
          if (this.hasData() && this.isIterable()) {
            if (isNaN(index)) return;
            if (prop) {
              return __data[index][prop];
            } else {
              return __data[index];
            }
          } else {
            return __data[index];
          }
        },

        deleteItemProp: function(index, prop, doNotPropogate) {
          var self = this;
          if (this.hasData() && this.isIterable()) {
            if (isNaN(index)) return;
            if (typeof prop === 'string') {
              __lastModifiedTime = Date.now();
              delete __data[index][prop];
              propogateData(__handle, __data, doNotPropogate);
            } else if (prop === true) {
              __lastModifiedTime = Date.now();
              __data.splice(index, 1);
              propogateData(__handle, __data, prop);
            } else {
              __lastModifiedTime = Date.now();
              __data.splice(index, 1);
              propogateData(__handle, __data, doNotPropogate);
            }
          }
          if (__autobox) {
            self.box({
              key: __key
            });
          }
        },

        getLastModTime: function() {
          return __lastModifiedTime;
        },

        box: function(options) {
          /*
            options = {
              key: key,
              boxName: name,
              autosync: true
            }
          */

          if (!options) return;
          var value;
          __autobox = options.autobox || __autobox;
          __name = options.name || $.Box.__config.name;
          __boxName = options.boxName || 'keyvaluepairs';
          __key = options.key || this.getHandle();

          // Box the model's data:
          value = this.getData();
          $.Box.set(__key, value).then(function(item) {
            __lastBoxTime = Date.now();
          });
        },

        setToAutobox: function() {
          __autobox = true;
        },

        isBoxed: function() {
          return __lastBoxTime ? true : false;
        },

        isAutoBoxed: function() {
          return __autobox ? true : false;
        },

        getLastBoxTime: function() {
          return __lastBoxTime;
        }

      };
    }
  });
})();