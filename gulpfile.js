/*global -$ */
'use strict';
// generated on 2015-03-17 using generator-gulp-webapp 0.3.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');

var path = require('path');

gulp.task('scripts-debug', function () {
  var spawn = require('child_process').spawn;
  spawn('node', [
    '--debug-brk',
    path.join(__dirname, 'node_modules/gulp/bin/gulp.js'),
    'scripts'
  ], { stdio: 'inherit' });
});


gulp.task('scripts', function () {
  console.log('why you no stop?');

  var a; // for the debuggins

  // This works correctly
  a = browserify({
    entries: './app/scripts/main.js'
  });

  a.transform(babelify);
  console.log('why you no stop again?');
  a = a.bundle();
  // a = a.pipe($.sourcemaps.init({loadMaps: true}));
  // a = a.pipe($.sourcemaps.write('./'));
  a = a.pipe(source('bundle.js'));
  a = a.pipe(gulp.dest('.tmp/scripts'));

  return a;


// This will add sourcemaps, but will not compile the es6
/*

  var browserified = transform(function(filename) {
    var b = browserify({entries: filename, debug: true});
// when this is uncommented:
// Error: write after end
    // b.transform(babelify);
    return b.bundle();
  });

  return gulp.src('./app/scripts/main.js')
    .pipe(browserified)
    .pipe($.sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('.tmp/scripts'));
*/




// This is a mish-mash of stuff.
  // var b = browserify({
  //   entries: './app/scripts/main.js'
  // });
  // b.transform(babelify);
  // return b.bundle()
  //  .pipe(source('bundle.js'))
  //  .pipe(gulp.dest('.tmp/scripts'));

  // return gulp.src('./app/scripts/main.js')
  //   .pipe(browserified)
  //   // .pipe($.sourcemaps.init({loadMaps: true}))
  //   // .pipe($.sourcemaps.write('./'))
  //   .pipe(gulp.dest('.tmp/scripts'));



// None of the rest of these worked.
  // var b = $.browserify();
  // b.transform($.babelify);
  // b.add(['app/scripts/**/main.js']);
  // return b.bundle()
  //   .pipe($.source('bundle.js'))
  //   .pipe(gulp.dest('.tmp/scripts'));

  // var b = $.browserify({
  //       entries: 'app/scripts/**/main.js'
  // })
  // .transform($.babelify)
  // .bundle()
  // .pipe($.source('bundle.js'))
  //   .pipe(gulp.dest('.tmp/scripts'));
});

gulp.task('styles', function () {
  return gulp.src('app/styles/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('html', ['styles', 'scripts'], function () {
  var assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'scripts', 'fonts'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  // watch for changes
  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    '.tmp/scripts/**/*.js',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts', reload]);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass-official'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
