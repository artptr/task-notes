var gulp = require('gulp');
var webpack = require('webpack-stream');
var named = require('vinyl-named');
var inject = require('gulp-inject');

var distPath = './dist';

gulp.task('default', function () {
  // scripts
  var scripts = gulp.src('./src/app.js')
    .pipe(named())
    .pipe(webpack({
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015']
          }
        }
      ],
      devtool: 'source-map'
    }))
    .pipe(gulp.dest(distPath));

  // page
  return gulp.src('./src/index.html')
    .pipe(inject(scripts, {relative: true}))
    .pipe(gulp.dest(distPath));
});
