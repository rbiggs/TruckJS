// Truck Engine - Formatters Module:
(function() {
  "use strict";
  //==============================
  // Format Numbers for Thousands:
  //==============================
  $.extend({
    formatNumber: function(amount, separator, decimal) {
      var sep = separator || ",";
      // Allow the user to round a float to a whole number:
      if (decimal === 0) {
        var num = Math.round(amount);
        return Number(num).toString().replace(/(?=(?:\d{3})+$)(?!^)/g, sep);
      }
      if (decimal === undefined) {
        // Check if amount is a float:
        if (typeof amount === 'number' && amount % 1 !== 0) {
          return Number(amount).toString().replace(/\d(?=(\d{3})+\.)/g, '$&' + sep);
          // Otherwise treat it as an integer:
        } else {
          return Number(amount).toString().replace(/(?=(?:\d{3})+$)(?!^)/g, sep);
        }
        // If a decimal value was provided,
        // format it to that amount:
      } else {
        return Number(amount).toFixed(decimal).replace(/\d(?=(\d{3})+\.)/g, '$&' + sep);
      }
    },

    //=======================
    // Return sum of numbers:
    //=======================
    sum: function(arr) {
      var ret;
      if (Array.isArray(arr) && arr.length) {
        ret = arr;
      } else {
        ret = [].slice.apply(arguments);
      }
      return ret.reduce(function(a, b) {
        return a + b;
      });
    },

    //=================
    // Format currency:
    //=================
    currency: function(amount, symbol, separator, decimal) {
      var sym = symbol || "$";
      var sep = separator || ",";
      var dec = decimal || 2;
      var zero = false;
      if (decimal === 0) {
        zero = true;
      }
      // Private function to format amounts:
      var formatNumber = function(amount, sep) {
        // A decimal value of '0' means
        // we need to round the amount off
        // before adding in thousands separators:
        if (zero) {
          var num = Math.round(amount);
          return Number(num).toString().replace(/^0+/, '').replace(/(?=(?:\d{3})+$)(?!^)/g, sep);
        } else {
          // Otherwise, we can just add the thousands
          // separators with the decimal placement
          // provided by the user or the default:
          return Number(amount).toFixed(dec).replace(/^0+/, '').replace(/\d(?=(\d{3})+\.)/g, '$&' + sep);
        }
      };
      return sym + formatNumber(amount, sep);
    },

    //=============
    // Format Time:
    //=============
    formatTime: function(time) {
      var temp = time.split(':');
      var temp2 = temp[0] + ':' + temp[1];
      var ampm = time.split(' ')[1];
      return temp2 + ' ' + ampm;
    },

    sortDate: function(date1, date2) {
      return new Date(date1) - new Date(date2);
    },

    //==============
    // Sort Numbers:
    //==============
    sortNumbers: function(a, b) {
      return a - b;
    },

    sortNumbersDescending: function(a, b) {
      return b - a;
    }

  });
})();