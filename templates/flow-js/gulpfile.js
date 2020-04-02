const { src, dest, watch, parallel } = require('gulp')
const flowRemoveTypes = require('gulp-flow-remove-types2')
const uglify = require('gulp-uglify-es').default
const rename = require('gulp-rename')
const path = require('path')

function css() {
  // Change here extension of stylesheet files
  return src('src/**/*.css')
    .on('error', console.error)
    // Need to set files to one directory
    .pipe(rename((file) => {
      file.dirname = path.sep
    }))
    .pipe(dest('public/styles'))
}

function mjsDev() {
  return src('src/**/*.mjs')
    .pipe(flowRemoveTypes({
      pretty: true
    }))
    .pipe(dest('public/'))
}

function mjs() {
  return src('src/**/*.mjs')
    .pipe(flowRemoveTypes())
    .pipe(uglify({
      ecma: 2018,
      module: true,
      keep_classnames: true,
      keep_fnames: true
    }))
    .on('error', console.error)
    .pipe(dest('public/'))
}

exports.default = () => {
  watch('src/**/*.css', css)
  watch('src/**/*.mjs', mjsDev)
}
exports.minimize = parallel(mjs, css)
