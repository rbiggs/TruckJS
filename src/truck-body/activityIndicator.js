// Truck Body - Activity Indicator
(function() {
  "use strict";
  $.fn.extend({
    //===========================
    // Setup activitiy indicator:
    //===========================
    Busy: function(options) {
      var settings = {
        size: 40,
        color: '#666',
        position: false
      };
      $.extend(settings, options);

      var $this = this;
      var spinner;
      // For iOS:
      var iOSBusy = function() {
        var small;
        if (parseInt(settings.size, 10) < 30) {
          spinner = "<svg class='truck-busy small' width='" + settings.size + "px' height='" + settings.size + "px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'>  <g x='0' y='0' width='100' height='100' fill='none' class='bk'><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(0 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(45 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(90 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(135 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(180 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(225 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(270 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(315 50 50) translate(0 -30)'></rect></g></svg>";
          $this.append(spinner);
        } else {
          spinner = "<svg class='truck-busy' width='" + settings.size + "px' height='" + settings.size + "px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' class='uil-default'> <g x='0' y='0' width='100' height='100' fill='none'><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(0 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(30 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(60 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(90 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(120 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(150 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(180 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(210 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(240 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(270 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(300 50 50) translate(0 -30)'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='" + settings.color + "' transform='rotate(330 50 50) translate(0 -30)'></rect></g></svg>";
          $this.append(spinner);
        }
      };

      // For Android:
      var androidBusy = function() {
        settings.id = $.uuid();
        var androidActivityIndicator = null;
        var position = settings.position ? (' ' + settings.position) : '';
        if ($.isNativeAndroid) {
          androidActivityIndicator = '<svg class="busy' + position + '" version="1.1" id="' + settings.id + '" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><g><path fill="none" stroke="' + settings.color + '" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M74.2,65c2.7-4.4,4.3-9.5,4.3-15c0-15.7-12.8-28.5-28.5-28.5S21.5,34.3,21.5,50c0,5.5,1.6,10.6,4.3,15"/></g><polyline fill="none" stroke="' + settings.color + '" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="89.4,56.1 74.3,65 65.4,49.9 "/></svg>';

          $this.append(androidActivityIndicator);
          return;
        } else {
          androidActivityIndicator = '<svg id="' + settings.id + '" class="busy' + position + '" x="0px" y="0px" viewBox="0 0 100 100"><circle stroke="url(#SVGID_1_)" cx="50" cy="50" r="28.5"/></svg>';
          $this.append(androidActivityIndicator);
          $this.addClass('hasActivityIndicator');
          if (settings.position) {
            $('#' + settings.id).addClass(settings.position);
          }
          if (options.color) {
            $('#' + settings.id).find('circle').css('stroke', options.color);
          }
        }
        $('#' + settings.id).css({
          'height': settings.size + 'px',
          'width': settings.size + 'px'
        });
        return $('#' + settings.id);
      };

      // For Windows 8/WP8:
      var winBusy = function() {
        var spinner = $('<progress class="busy"></progress>');
        $(spinner).css({
          'color': settings.color
        });
        $(spinner).attr('role', 'progressbar');
        $(spinner).addClass('win-ring');
        if (settings.position) $(spinner).addClass(settings.position);
        $this.append(spinner);
      };

      // Create Busy control for appropriate OS:
      if ($('body').hasClass('isWindows')) {
        winBusy(options);
      } else if ($('body').hasClass('isAndroid')) {
        androidBusy(options);
      } else if ($('body').hasClass('isiOS')) {
        iOSBusy(options);
      }
    }
  });
})();