// Tank Body - Stepper
(function() {
  'use strict';
  $.extend({
    //==================
    // Create a stepper:
    //==================
    Stepper: function(options) {
      if (!options) return $();
      if (!options.element) return;
      if (!options.min) return;
      if (!options.max) return;

      var stepper = $(options.element);
      var min = options.min;
      var max = options.max;
      var defaultValue = options.defaultValue ? options.defaultValue : options.min;
      var increaseSymbol = '+';
      var decreaseSymbol = '-';
      if ($.isWin) {
        increaseSymbol = '';
        decreaseSymbol = '';
      }
      var decreaseButton = '<button class="decrease"><span>-</span></button>';
      var label = '<label>' + defaultValue + '</label><input type="text" value="' + defaultValue + '">';
      var increaseButton = '<button class="increase"><span>+</span></button>';
      stepper.append(decreaseButton + label + increaseButton);
      stepper.data('data-value', {
        min: min,
        max: max,
        defaultValue: defaultValue
      });

      var increaseStepperValue = function() {
        var currentValue = stepper.find('input').val();
        var value = stepper.data('data-value');
        var max = value.max;
        var newValue;
        if (currentValue >= max) {
          $(this).addClass('disabled');
        } else {
          newValue = Number(currentValue) + 1;
          stepper.find('button:first-of-type').removeClass('disabled');
          stepper.find('label').text(newValue);
          stepper.find('input')[0].value = newValue;
          if (currentValue === max) {
            $(this).addClass('disabled');
          }
        }
      };

      var decreaseStepperValue = function() {
        var currentValue = stepper.find('input').val();
        var value = stepper.data('data-value');
        var min = value.min;
        var newValue;
        if (currentValue <= min) {
          $(this).addClass('disabled');
        } else {
          newValue = Number(currentValue) - 1;
          stepper.find('button:last-of-type').removeClass('disabled');
          stepper.find('label').text(newValue);
          stepper.find('input')[0].value = newValue;
          if (currentValue === min) {
            $(this).addClass('disabled');
          }
        }
      };

      stepper.find('button:last-of-type').on('tap', function() {
        increaseStepperValue.call(this, stepper);
      });

      stepper.find('button:first-of-type').on('tap', function() {
        decreaseStepperValue.call(this, stepper);
      });

      return {
        getValue: function() {
          return stepper.find('input').val();
        }
      }
    }
  });
})();