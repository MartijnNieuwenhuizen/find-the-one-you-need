'use strict';

const config = {};


config.dist = './public/';
config.taskPath = './gulp/tasks/';

config.sass = {
  src: './src/sass/main.scss',
  watch: './src/sass/**/*.scss',
  destFile: 'style.min.css',
  largeFile: 'style.css',
  folder: 'css'
};

config.js = {
  src: './src/js/main.js',
  watch: 'src/js/**/*.js',
  destFile: 'script.min.js',
  largeFile: 'script.js',
  folder: 'js'
};

config.fonts = {
  src: './src/fonts/**/*',
  watch: './src/fonts/**/*',
  folder: 'fonts'
};

config.images = {
    watch: 'src/img/**/**',
    src: './src/img/**/**',
    folder: 'img'
};

module.exports = config;
