// Truck Engine - Validators Module:
(function() {
  "use strict";
  // Set validity state of form elements:
  var setValidityStatus = function(element, valid) {
    if (valid) {
      element[0].valid = true;
      element[0].invalid = false;
      element.addClass('valid').removeClass('invalid');
    } else {
      element[0].valid = false;
      element[0].invalid = true;
      element.addClass('invalid').removeClass('valid');
    }
  };

  // Used to check input validity:
  var checkValidity = function(element, expression) {
    if (expression) {
      setValidityStatus(element, true);
    } else {
      setValidityStatus(element, false);
    }
    return expression;
  };

  $.fn.extend({
    isNotEmpty: function(ctx) {
      if (this[0].nodeName !== 'INPUT') return;
      return checkValidity(this, this[0].nodeName === 'INPUT' && this[0].value);
    },

    validateAlphabetic: function() {
      if (this[0].nodeName !== 'INPUT') return;
      var letters = /^[A-Za-z]+$/;
      var value = this[0].nodeName === 'INPUT' && this[0].value;
      checkValidity(this, value.match(letters));
      if (value) {
        return checkValidity(this, value.match(letters));
      }
    },

    validateNumber: function() {
      if (this[0].nodeName !== 'INPUT') return;
      var numbers = /^[+-]?\d+(\.\d+)?$/;
      var value = this[0].nodeName === 'INPUT' && this[0].value;
      checkValidity(this, value.match(numbers));
      if (value) {
        return checkValidity(this, value.match(numbers));
      }
    },

    validateAlphaNumeric: function() {
      if (this[0].nodeName !== 'INPUT') return;
      var letters = /^[0-9a-zA-Z]+$/;
      var value = this[0].nodeName === 'INPUT' && this[0].value;
      checkValidity(this, value.match(letters));
      if (value) {
        return checkValidity(this, value.match(letters));
      }
    },

    validateUserName: function(minimum) {
      if (this[0].nodeName !== 'INPUT') return;
      var letters = /^[a-zA-Z0-9]+$/;
      var username = this[0].value;
      if (!username) return checkValidity(this, username);
      if (minimum && username.match(letters)) {
        if (username.length >= minimum) {
          return checkValidity(this, username);
        } else {
          return checkValidity(this, false);
        }
      } else {
        return checkValidity(this, checkValidity(this, username.match(letters)));
      }
    },

    validateEmail: function() {
      if (this[0].nodeName !== 'INPUT') return;
      var value = this[0].value;
      var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (value) {
        return checkValidity(this, value.match(email));
      } else {
        return checkValidity(this, false);
      }
    },

    validatePhoneNumber: function() {
      if (this[0].nodeName !== 'INPUT') return;
      var phone;
      var phoneNumber;
      var convertLettersToNumbers = function(value) {
        var phonenumber = "";
        value = value.toLowerCase();
        var len = value.length;
        for (var i = 0; i < len; i++) {
          var character = value.charAt(i);
          switch (character) {
            case '0':
              phonenumber += "0";
              break;
            case '1':
              phonenumber += "1";
              break;
            case '2':
              phonenumber += "2";
              break;
            case '3':
              phonenumber += "3";
              break;
            case '4':
              phonenumber += "4";
              break;
            case '5':
              phonenumber += "5";
              break;
            case '6':
              phonenumber += "6";
              break;
            case '7':
              phonenumber += "7";
              break;
            case '8':
              phonenumber += "8";
              break;
            case '9':
              phonenumber += "9";
              break;
            case '-':
              phonenumber += "-";
              break;
            case 'a':
            case 'b':
            case 'c':
              phonenumber += "2";
              break;
            case 'd':
            case 'e':
            case 'f':
              phonenumber += "3";
              break;
            case 'g':
            case 'h':
            case 'i':
              phonenumber += "4";
              break;
            case 'j':
            case 'k':
            case 'l':
              phonenumber += "5";
              break;
            case 'm':
            case 'n':
            case 'o':
              phonenumber += "6";
              break;
            case 'p':
            case 'q':
            case 'r':
            case 's':
              phonenumber += "7";
              break;
            case 't':
            case 'u':
            case 'v':
              phonenumber += "8";
              break;
            case 'w':
            case 'x':
            case 'y':
            case 'z':
              phonenumber += "9";
              break;
          }
        }
        return phonenumber;
      };
      if (this[0].value) {

        // International Numbers:
        if (int) {
          phoneNumber = this[0].value.replace(/[\(\)\.\-\ ]/g, '');
          return checkValidity(this, this.isNotEmpty() && !isNaN(phoneNumber));

          // North America (US and Canada):
        } else {
          phoneNumber = this[0].value.replace(/[\(\)\.\-\ ]/g, '');
          phoneNumber = convertLettersToNumbers(phoneNumber);
          phone = /((\(\d{3}\)?)|(\d{3}))([\s-./]?)(\d{3})([\s-./]?)(\d{4})/;
          return checkValidity(this, phoneNumber.match(phone));
        }
      } else {
        return checkValidity(this, false);
      }
    },

    validateUrl: function() {
      if (this[0].nodeName !== 'INPUT') return;
      if (this[0].value) {
        var url = /^(ftp|http|https):\/\/([w]{3}\.)?(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
        return checkValidity(this, this[0].value.match(url));
      } else {
        return checkValidity(this, false);
      }
    },

    validateAge: function(minimum) {
      if (this[0].nodeName !== 'INPUT') return;
      if (!minimum) return;
      var age = this[0].value;
      if (age) {
        return checkValidity(this, age >= minimum);
      } else {
        return checkValidity(this, false);
      }
    },

    validateCheckbox: function() {
      if (this[0].nodeName !== 'INPUT') return;
      if (this[0].nodeName === 'INPUT' && this[0].type === 'checkbox') {
        return checkValidity(this, this[0].checked === true);
      }
    },

    validateRadioButtons: function() {
      if (this[0].nodeName !== 'INPUT') return;
      var choice = false;
      if (this[0].nodeName === 'INPUT' && this[0].type === 'radio') {
        $.each(this, function(idx, button) {
          if (button.checked === true) {
            choice = true;
          }
        });
        return checkValidity(this, choice);
      }
    },

    validateSelectBox: function() {
      if (this[0].nodeName === 'SELECT') {
        return checkValidity(this, this[0].selectedIndex);
      } else {
        return;
      }
    },

    validateSwitch: function() {
      var checkbox = this.find('input[type=checkbox]')[0];
      if (checkbox.checked) {
        return true;
      } else {
        return false;
      }
    },

    validateSelectList: function() {
      var radio = this.find('input[type=radio]');
      if (radio.iz('[checked]')[0]) {
        return true;
      } else {
        return false;
      }
    }
  });

  $.extend({
    validatePassword: function(input1, input2, minimum) {
      if (minimum && $(input1).val().length < minimum || $(input2).val().length < minimum) {
        $(input1).addClass('invalid').removeClass('valid');
        $(input2).addClass('invalid').removeClass('valid');
        return false;
      } else {
        var letters = /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/;
        if (!letters.test($(input1).val()) && !letters.test($(input2).val())) return false;
        if ($(input1).val() === $(input2).val()) {
          $(input1).removeClass('invalid').addClass('valid');
          $(input2).removeClass('invalid').addClass('valid');
        } else {
          $(input1).addClass('invalid').removeClass('valid');
          $(input2).addClass('invalid').removeClass('valid');
        }
        return $(input1).val() === $(input2).val();
      }
    },

    validateWithRegex: function(input, regex) {
      if (!regex) {
        console.error('This method requires a regular expression.');
        return;
      }
      var value = $(input).val();
      var re = new RegExp(regex);
      return checkValidity(this, value.match(re));
    }
  });
})();