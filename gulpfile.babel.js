import gulp from 'gulp';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import webpack from 'webpack';

import devConfig from './webpack/dev.config';

gulp.task('webpack:dev', (callback) => {
  webpack(devConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack:dev', err);
    }
    gutil.log('[webpack:dev]', stats.toString({ colors: true }));
  });
  callback();
});

gulp.task('views:dev', () => {
  gulp.src('./chrome/**/*.html')
    .pipe(gulp.dest('./dev'));
});

gulp.task('copy:dev', () => {
  gulp.src('./chrome/extension/manifest.json')
    .pipe(rename('manifest.json'))
    .pipe(gulp.dest('./dev'));
  gulp.src('./chrome/assets/**/*').pipe(gulp.dest('./dev'));
});

gulp.task('views:watch', () => {
  gulp.watch('./chrome/views/*.html', ['views:dev']);
});

gulp.task('copy:watch', () => {
  gulp.watch(['./chrome/extension/manifest.json', './chrome/assets/**/*'], ['copy:dev']);
});

gulp.task('default', ['webpack:dev', 'views:dev', 'copy:dev', 'views:watch', 'copy:watch']);