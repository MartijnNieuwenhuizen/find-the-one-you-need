'use strict';

const browserSync     = require('browser-sync');

module.exports = function (gulp, $, config, error) {
  gulp.task('browser-sync', function() {
    return browserSync.init({
      proxy: 'http://localhost:3000',
      notify: false
    });
  });
  };
