var gulp = require('gulp');
var webpack = require('webpack-stream');
var named = require('vinyl-named');

var distPath = './dist';

gulp.task('css', function () {
  return gulp.src('./src/css/app.css')
    .pipe(gulp.dest(distPath));
});

gulp.task('js', function () {
  return gulp.src('./src/js/app.js')
    .pipe(named())
    .pipe(webpack({
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
              presets: ['react', 'es2015']
            }
          }
        ]
      },
      devtool: 'source-map'
    }))
    .pipe(gulp.dest(distPath));
});

gulp.task('html', function () {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest(distPath));
});

gulp.task('default', ['css', 'js', 'html']);
