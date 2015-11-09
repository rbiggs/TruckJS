// Truck Wheels - Form Serialization Module:
(function() {
  "use strict";
  if (typeof jQuery !== 'undefined') return;

  // Serialize an object into name/value pairs 
  // for posting to server:
  //==========================================
  $.fn.extend({
    serializeArray: function() {
      var name;
      var type;
      var ret = [];
      var add = function(value) {
        if ($.type(value) === 'array') {
          return value.forEach(add);
        }
        ret.push({
          name: name,
          value: value
        });
      };
      if (this[0]) {
        $.each([].slice.apply(this[0].elements), function(_, field) {
          type = field.type;
          name = field.name;
          if (name && field.nodeName.toLowerCase() != 'fieldset' &&
            !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&
            ((type != 'radio' && type != 'checkbox') || field.checked)) {
            add($(field).val());
          }
        });
      }
      return ret;
    },

    // Serialize the values of a form:
    //================================
    serialize: function() {
      var ret = [];
      this.serializeArray().forEach(function(element) {
        ret.push(encodeURIComponent(element.name) + '=' + encodeURIComponent(element.value));
      });
      return ret.join('&');
    }
  });

  // Private function used by $.param:
  //==================================
  function serialize(params, obj, traditional, scope) {
    var type, array = $.type(obj) === 'array',
      hash = $.isEmptyObject(obj);

    // If it's an array of objects:
    if ($.type(obj) === 'array') {
      $.each(obj, function(key, value) {
        type = $.type(value);
        if (scope) {
          key = traditional ? scope : scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
        }
        if (!scope && array) {
          params.add(value.name, value.value);
        } else if (type == "array" || (!traditional && type == "object")) {
          serialize(params, value, traditional, key);
        } else {
          params.add(key, value);
        }
      });

      // Else its an object (use key/value loop):
    } else if ($.type(obj) === 'object') {
      for (var key in obj) {
        type = $.type(obj[key]);
        if (scope) {
          key = traditional ? scope : scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
        }
        if (!scope && array) {
          params.add(obj[key].name, obj[key].obj[key]);
        } else if (type == "array" || (!traditional && type == "object")) {
          serialize(params, obj[key], traditional, key);
        } else {
          params.add(key, obj[key]);
        }
      }
    }
  }

  $.extend({

    // Serialize an object for posting to server:
    //===========================================
    param: function(obj, traditional) {
      var params = [];
      params.add = function(key, value) {
        if ($.type(value) === 'function') value = value();
        if (value === null) value = "";
        this.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
      };
      serialize(params, obj, traditional);
      return params.join('&').replace(/%20/g, '+');
    }
  });
})();