// Import modules:
var gulp = require('gulp');
var path = require("path");
var pkg = require('./package.json');
var concat = require('gulp-concat');
var gutils = require('gulp-util');
var ts = require('gulp-typescript');
var beautify = require('gulp-jsbeautifier');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var colors = require('colors');
var combiner = require('stream-combiner2');

var filePathStart = 'src/';
var osTypes = ['truck-android','truck-ios','truck-windows']

// Files for Truck Wheel, Engine, Chassis & Body:
var Truck_Files = [  
  /* Truck Wheel Components */
  'truck-wheels/wheels-comments.js',
  'truck-wheels/domstack.js',
  'truck-wheels/selectors.js',
  'truck-wheels/utils.js',
  'truck-wheels/types.js',
  'truck-wheels/strings.js',
  'truck-wheels/domstack.js',
  'truck-wheels/dom.js',
  'truck-wheels/data.js',
  'truck-wheels/serialize.js',
  'truck-wheels/events.js',

  /* Truck Engine Components */
  'truck-engine/engine-comments.js',
  'truck-engine/environment.js',
  'truck-engine/event-aliases.js',
  'truck-engine/gestures.js',
  'truck-engine/plugins.js',
  'truck-engine/stack.js',
  'truck-engine/mediator.js',
  'truck-engine/model.js',
  'truck-engine/view.js',
  'truck-engine/component.js',
  'truck-engine/screens.js',
  'truck-engine/router.js',
  'truck-engine/promises.js',
  'truck-engine/fetch.js',
  'truck-engine/formatters.js',
  'truck-engine/validators.js',
  'truck-engine/box.js',
  'truck-engine/anim.js',
  'truck-engine/oop.js',

  /* Truck Body Components */
  'truck-body/body-comments.js',
  'truck-body/navbar.js',
  'truck-body/setup.js',
  'truck-body/buttons.js',
  'truck-body/navigation.js',
  'truck-body/tabbar.js',
  'truck-body/slide-out.js',
  'truck-body/editable.js',
  'truck-body/form.js',
  'truck-body/selectList.js',
  'truck-body/multiSelectList.js',
  'truck-body/switches.js',
  'truck-body/block.js',
  'truck-body/popup.js',
  'truck-body/segmented.js',
  'truck-body/range.js',
  'truck-body/sheets.js',
  'truck-body/paging.js',
  'truck-body/stepper.js',
  'truck-body/popover.js',
  'truck-body/center.js',
  'truck-body/activityIndicator.js'
].map(function(file) {
  return path.join(filePathStart, file);
});

var Min_Build = [
  /* Truck Wheel Components */
  'truck-wheels/domstack.js',
  'truck-wheels/selectors.js',
  'truck-wheels/utils.js',
  'truck-wheels/types.js',
  'truck-wheels/strings.js',
  'truck-wheels/domstack.js',
  'truck-wheels/dom.js',
  'truck-wheels/data.js',
  'truck-wheels/serialize.js',
  'truck-wheels/events.js',

  /* Truck Engine Components */
  'truck-engine/environment.js',
  'truck-engine/event-aliases.js',
  'truck-engine/gestures.js',
  'truck-engine/plugins.js',
  'truck-engine/stack.js',
  'truck-engine/mediator.js',
  'truck-engine/model.js',
  'truck-engine/view.js',
  'truck-engine/component.js',
  'truck-engine/screens.js',
  'truck-engine/router.js',

  /* Truck Body Components */
  'truck-body/navbar.js',
  'truck-body/setup.js',
  'truck-body/buttons.js',
  'truck-body/navigation.js',
  'truck-body/center.js',
].map(function(file) {
  return path.join(filePathStart, file);
});

var Truck_Wheel_Files = [
  /* Truck Wheel Components */
  'truck-wheels/wheels-comments.js',
  'truck-wheels/domstack.js',
  'truck-wheels/selectors.js',
  'truck-wheels/utils.js',
  'truck-wheels/types.js',
  'truck-wheels/strings.js',
  'truck-wheels/domstack.js',
  'truck-wheels/dom.js',
  'truck-wheels/data.js',
  'truck-wheels/serialize.js',
  'truck-wheels/events.js',
  'truck-engine/environment.js',
  'truck-engine/event-aliases.js',
  'truck-engine/gestures.js',
  'truck-engine/plugins.js',
  'truck-engine/mediator.js',
  'truck-engine/promises.js',
  'truck-engine/fetch.js',
  'truck-engine/formatters.js',
  'truck-engine/validators.js'
].map(function(file) {
  return path.join(filePathStart, file);
});

var Truck_Engine_Files = [
  /* Truck Engine Components */
  'truck-engine/engine-comments.js',
  'truck-engine/environment.js',
  'truck-engine/event-aliases.js',
  'truck-engine/gestures.js',
  'truck-engine/plugins.js',
  'truck-engine/stack.js',
  'truck-engine/mediator.js',
  'truck-engine/model.js',
  'truck-engine/view.js',
  'truck-engine/screens.js',
  'truck-engine/router.js',
  'truck-engine/promises.js',
  'truck-engine/fetch.js',
  'truck-engine/formatters.js',
  'truck-engine/validators.js',
  'truck-engine/box.js'
].map(function(file) {
  return path.join(filePathStart, file);
});

var Truck_MVC_Files = [
  /* Truck MVP Components */
  'truck-engine/plugins.js',
  'truck-engine/stack.js',
  'truck-engine/mediator.js',
  'truck-engine/model.js',
  'truck-engine/view.js',
  'truck-engine/box.js'
].map(function(file) {
  return path.join(filePathStart, file);
});

var Truck_Body_Files = [
  {os: 'android', src: 'src/js/truck-body/truck-android.css'},
  {os: 'ios', src: 'src/js/truck-body/truck-ios.css'},
  {os: 'windows', src: 'src/js/truck-body/truck-windows.css'}
];


// Concat, minify and output JavaScript:
gulp.task('js', function () {
  if (gutils.env.wheels) {
    console.log('There\'s some Truck Wheels coming your way.');

    gulp.src(Truck_Wheel_Files)
    .pipe(concat('truck-wheels.js'))
    .pipe(beautify({indentSize: 2, braceStyle: "collapse", spaceBeforeConditional: true}))
    .pipe(gulp.dest('dist/'))
    .pipe(uglify({ mangle: false }))
    .pipe(rename("truck-wheels.min.js"))
    .pipe(gulp.dest('dist/'));

  } else if ( gutils.env.engine) {
    console.log('There\'s a Truck Engine coming your way.');

    gulp.src(Truck_Engine_Files)
    .pipe(concat('truck-engine.js'))
    .pipe(beautify({indentSize: 2, braceStyle: "collapse", spaceBeforeConditional: true}))
    .pipe(gulp.dest('dist/'))
    .pipe(uglify({ mangle: false }))
    .pipe(rename("truck-engine.min.js"))
    .pipe(gulp.dest('dist/'));

  } else if ( gutils.env.mvc) {
    console.log('We\'re putting together your request for Truck MVC')
    gulp.src(Truck_MVC_Files)
      .pipe(concat('truck-tank.js'))
      .pipe(beautify({indentSize: 2, braceStyle: "collapse", spaceBeforeConditional: true}))
      .pipe(gulp.dest('dist/'))
      .pipe(uglify({ mangle: false }))
      .pipe(rename("truck-tank.min.js"))
      .pipe(gulp.dest('dist/'));

  } else if ( gutils.env.minimum) {
    console.log('We are building a minimum version of Truck for you.');
    if (gutils.env.extras) {
      var extra = gutils.env.extras
      var extras = extra.split(' ');
      if (extras.indexOf('promises') < 0 && (extras.indexOf('fetch') || extras.indexOf('box'))) {
        console.log('Adding promises');
        extras.push('promises');
      }
      if (extras.indexOf('validators') < 0 && extras.indexOf('form')) {
        extras.push('validators');
      }
      if (extras.indexOf('block') < 0 && (extras.indexOf('activityindicator') || extras.indexOf('popup') || extras.indexOf('popover'))) {
        extras.push('block');
      }
      extras.forEach(function(feature) {
        console.log('Add feature: ' + feature);
        switch(feature) {
          case 'promises':
            Min_Build.push(path.join(filePathStart, 'truck-engine', 'promises' + '.js'));
            return;
          case 'fetch':
            Min_Build.push(path.join(filePathStart, 'truck-engine', 'fetch' + '.js'));
            return;
          case 'validators':
            Min_Build.push(path.join(filePathStart, 'truck-engine', 'validators' + '.js'));
            return;
          case 'box':
            Min_Build.push(path.join(filePathStart, 'truck-engine', 'box' + '.js'));
            return;
          case 'anim':
            Min_Build.push(path.join(filePathStart, 'truck-engine', 'anim' + '.js'));
            return;
          case 'oop':
            Min_Build.push(path.join(filePathStart, 'truck-engine', 'oop' + '.js'));
            return;
          case 'tabbar':
            Min_Build.push(path.join(filePathStart, 'truck-body', 'tabbar' + '.js'));
            return;
          case 'slideout':
            Min_Build.push(path.join(filePathStart, 'truck-body', 'slide-out' + '.js'));
            return;
          case 'editable':
            Min_Build.push(path.join(filePathStart, 'truck-body', 'editable' + '.js'));
            return;
          case 'form':
            Min_Build.push(path.join(filePathStart, 'truck-body', 'form' + '.js'));
            return;
          case 'select':
            Min_Build.push(path.join(filePathStart, 'truck-body', 'selectList' + '.js'));
            return;
          case 'multiSelect':
          case 'multiselect':
            Min_Build.push(path.join(filePathStart, 'truck-body', 'multiSelectList' + '.js'));
            return;
          case 'switch':
          case 'switches':
            Min_Build.push(path.join(filePathStart, 'truck-body', 'switches' + '.js'));
            return;
          case 'popup':
            Min_Build.push(path.join(filePathStart, 'truck-body', 'popup' + '.js'));
            return;
          case 'popover':
            Min_Build.push(path.join(filePathStart, 'truck-body', 'popover' + '.js'));
            return;
          case 'segmented':
            Min_Build.push(path.join(filePathStart, 'truck-body', 'segmented' + '.js'));
            return;
          case 'range':
            Min_Build.push(path.join(filePathStart, 'truck-body', 'range' + '.js'));
            return;
          case 'sheets':
            Min_Build.push(path.join(filePathStart, 'truck-body', 'sheets' + '.js'));
            return;
          case 'paging':
            Min_Build.push(path.join(filePathStart, 'truck-body', 'paging' + '.js'));
            return;
          case 'stepper':
            Min_Build.push(path.join(filePathStart, 'truck-body', 'stepper' + '.js'));
            return;
          case 'busy':
          case 'activityIndicator':
            Min_Build.push(path.join(filePathStart, 'truck-body', 'activityIndicator' + '.js'));
            return;
        }
      });

    }
    gulp.src(Min_Build)
      .pipe(concat('truck.js'))
      .pipe(beautify({indentSize: 2, braceStyle: "collapse", spaceBeforeConditional: true}))
      .pipe(gulp.dest('dist/'))
      .pipe(uglify({ mangle: false }))
      .pipe(rename("truck.min.js"))
      .pipe(gulp.dest('dist/'));

    gulp.src(Min_Build)
      .pipe(concat('truck.js'))
      .pipe(gulp.dest('dist/'));

    // Define CSS paths:
    typescriptDirectory = 'src/truck-chassis/';
    var cssFiles = [
      'truck-android.css',
      'truck-ios.css',
      'truck-windows.css'
    ].map(function (f) {
      return path.join(typescriptDirectory, f);
    });

  } else {
    // Print out Truck image:
    console.log('');
    console.log('     \/|||||||||\\'.red);
    console.log('     |//-----\\\\|'.red);
    console.log('     ||   '.red + '|'.gray + '   ||'.red);
    console.log('     |//-----\\\\|'.red);
    console.log('     // //|\\\\ \\\\'.red);
    console.log('    ('.red + '[_]'.white + '+===+'.red + '[_]'.white + ')'.red);
    console.log('    /_\\'.red + ' |||||'.white + ' /_\\'.red);
    console.log('   (( ))'.red + '+===+'.white + '(( ))'.red);
    console.log('    \\_/       \\_/'.red);
    console.log('   >==>'.green + ' TRUCK '.yellow + '<==<'.green);
    console.log(' ');
    console.log('Hold on tight. We\'re building your TruckJS now.');

    // Define CSS paths:
    typescriptDirectory = 'src/truck-chassis/';
    var cssFiles = [
      'truck-android.css',
      'truck-ios.css',
      'truck-windows.css'
    ].map(function (f) {
      return path.join(typescriptDirectory, f);
    });

    gulp.src(Truck_Files)
      .pipe(concat('truck.js'))
      .pipe(beautify({indentSize: 2, braceStyle: "collapse", spaceBeforeConditional: true}))
      .pipe(gulp.dest('dist/'))
      .pipe(uglify({ mangle: false }))
      .pipe(rename("truck.min.js"))
      .pipe(gulp.dest('dist/'));

    gulp.src(Truck_Files)
      .pipe(concat('truck.js'))
      .pipe(gulp.dest('dist/'));

    cssFiles.forEach(function(file, idx) {
      gulp.src(file)
        .pipe(gulp.dest('dist/styles'))
        .pipe(minifyCSS({}))
        .pipe(rename(osTypes[idx] + '.min.css'))
        .pipe(gulp.dest('dist/styles'));
    });
  }
});

/* 
  Four ways to build. Default will build Truck with everything.
  Using gulp --mvc will build only the mvc parts.
  Using gulp --wheels
  Using gulp --tank
  Using gulp --engine
 */

// gulp.task('default', ['js','jshint']);
gulp.task('default', ['js']);

