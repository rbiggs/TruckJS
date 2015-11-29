// Truck Body - Form Validation & JSON
(function() {
  'use strict';
  $.extend({
    //===========================================
    // Setup Form object to convert data to JSON,
    // and to validate form values:
    //===========================================
    Form: function(options) {
      if (!options || $.type(options) !== 'array') return;

      var __passed = false;
      var __errors = [];
      var __result = [];
      var customValidation;

      // Helper to validate form elements:
      //==================================
      function validateElement(item) {
        if (!__passed) {
          __errors.push({
            element: item.element,
            type: item.type
          });
          if (item.callback) item.callback();
        } else {
          convertToObject($(item.element).attr('name'), $(item.element).val());
        }
      }

      // Helper to convert form element names to JSON:
      //==============================================
      function convertToObject(name, value) {
        __result.push({
          name: name,
          value: value
        });
      }

      // Convert form names and values to JSON:
      //=======================================
      function convertObjectToJSON(data) {
        var delimiter = '_';
        var result = {};
        var arrays = {};
        data.forEach(function(item) {
          var value = item.value;
          if (value !== '') {
            var name = item.name;
            var nameParts = name.split(delimiter);
            var currResult = result;
            for (var j = 0; j < nameParts.length; j++) {
              var namePart = nameParts[j];
              var arrName;
              if (namePart.indexOf('[]') > -1 && j === nameParts.length - 1) {

                arrName = namePart.substr(0, namePart.indexOf('['));
                if (!currResult[arrName]) {
                  currResult[arrName] = [];
                }
                currResult[arrName].push(value);
              } else {
                if (namePart.indexOf('[') > -1) {
                  arrName = namePart.substr(0, namePart.indexOf('['));
                  var arrIdx = namePart.replace(/^[a-z]+\[|\]$/gi, '');
                  if (!arrays[arrName]) {
                    arrays[arrName] = {};
                  }
                  if (!currResult[arrName]) {
                    currResult[arrName] = [];
                  }
                  if (j === nameParts.length - 1) {
                    currResult[arrName].push(value);
                  } else {
                    if (!arrays[arrName][arrIdx]) {
                      currResult[arrName].push({});
                      arrays[arrName][arrIdx] = currResult[arrName][currResult[arrName].length - 1];
                    }
                  }
                  currResult = arrays[arrName][arrIdx];
                } else {
                  if (j < nameParts.length - 1) {
                    if (!currResult[namePart]) {
                      currResult[namePart] = {};
                    }
                    currResult = currResult[namePart];
                  } else {
                    currResult[namePart] = value;
                  }
                }
              }
            }
          }
        });
        return result;
      }

      // Validate form elements:
      //========================
      options.forEach(function(item) {
        switch (item.type) {
          case 'notempty':
            __passed = validateElement(item.element, item.type);
            __errors.push({
              element: item.element,
              type: item.type
            });
            return;
          case 'number':
            __passed = $(item.element).validateNumber();
            validateElement(item);
            return;
          case 'text':
            __passed = $(item.element).validateAlphabetic();
            validateElement(item);
            return;
          case 'alphanumeric':
            __passed = $(item.element).validateAlphaNumeric();
            validateElement(item);
            return;
          case 'username':
            __passed = $(item.element).validateUserName(item.min);
            validateElement(item);
            // minimum length
            return;
          case 'email':
            __passed = $(item.element).validateEmail();
            validateElement(item);
            return;
          case 'phone':
            __passed = $(item.element).validatePhoneNumber();
            validateElement(item);
            return;
          case 'url':
            __passed = $(item.element).validateUrl();
            validateElement(item);
            return;
          case 'age':
            __passed = $(item.element).validateAge(item.min);
            validateElement(item);
            // minimum length
            return;
          case 'checkbox':
            __passed = $(item.element).validateCheckbox();
            if (__passed) {
              // var checkbox = $(item.element)[0];
              validateElement(item);
            }
            return;
          case 'radio':
            __passed = $(item.element).validateRadioButtons();
            validateElement(item);
            return;
          case 'selectbox':
            __passed = $(item.element).validateSelectBox();
            validateElement(item);
            return;
          case 'password':
            __passed = $.validatePassword(item.element, item.element2, item.min);
            __errors.push({
              element: item.element,
              element2: item.element2,
              type: item.type
            });
            // input1, input2, minimum length
            return;
          case 'switch':
            __passed = $(item.element).validateSwitch();
            if (__passed) {
              validateElement(item);
            }
            return;
          case 'selectlist':
            __passed = $(item.element).validateSelectList();
            if (__passed) {
              validateElement(item);
            }
          case 'multiselectlist':
            __passed = $(item.element).validateMultiSelectList();
            var inputs;
            if (__passed) {
              inputs = $(item.element).find('input[type=checkbox]');
              inputs.forEach(function(item) {
                if (item.checked) {
                  convertToObject(item.name, item.value);
                }
              });
            }
        }
        if (item.type.match(/custom/)) {
          customValidation = item.type.split('custom-')[1];
          var cv = $.customValidators.filter(function(validator) {
            return (validator.name) === customValidation;
          });
          if (cv) {
            var result = $.validateWithRegex(item.element, cv[0].regex);
            if (result) {
              var el = $(item.element);
              convertToObject(el[0].name, el[0].value);
            } else {
              __errors.push({
                element: item.element,
                type: item.type
              });
              if (item.callback) item.callback();
            }
          }
        }
      });



      return {
        getErrors: function() {
          if (__errors.length) {
            return __errors;
          }
        },

        errors: function() {
          if (__errors.length) {
            return true;
          }
        },

        get: function() {
          // console.log(__result)
          return convertObjectToJSON(__result);
        }
      };
    }
  });
})();