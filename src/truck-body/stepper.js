// Tank Body - Stepper
(function() {
  'use strict';
  $.fn.extend({
    Stepper: function(options) {
      if (!options) return $();
      if (!options.start) return $();
      if (!options.end) return $();
      var stepper = $(this);
      var start = options.start;
      var end = options.end;
      var defaultValue = options.defaultValue ? options.defaultValue : options.start;
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
        start: start,
        end: end,
        defaultValue: defaultValue
      });

      var increaseStepperValue = function() {
        var currentValue = stepper.find('input').val();
        var value = stepper.data('data-value');
        var end = value.end;
        var newValue;
        if (currentValue >= end) {
          $(this).addClass('disabled');
        } else {
          newValue = Number(currentValue) + 1;
          stepper.find('button:first-of-type').removeClass('disabled');
          stepper.find('label').text(newValue);
          stepper.find('input')[0].value = newValue;
          if (currentValue === end) {
            $(this).addClass('disabled');
          }
        }
      };

      var decreaseStepperValue = function() {
        var currentValue = stepper.find('input').val();
        var value = stepper.data('data-value');
        var start = value.start;
        var newValue;
        if (currentValue <= start) {
          $(this).addClass('disabled');
        } else {
          newValue = Number(currentValue) - 1;
          stepper.find('button:last-of-type').removeClass('disabled');
          stepper.find('label').text(newValue);
          stepper.find('input')[0].value = newValue;
          if (currentValue === start) {
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
    }
  });
})();