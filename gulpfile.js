const { src, dest, watch } = require('gulp');
const uglify = require('gulp-uglify-es').default;

function mjs() {
  return src('src/**/*.mjs')
    .pipe(
      uglify({
        ecma: 2018,
        module: true,
        keep_classnames: true,
        keep_fnames: true,
      })
    )
    .pipe(dest('build/'));
}

function mjsDev() {
  return src('src/**/*.mjs').pipe(dest('build/'));
}

exports.default = function () {
  watch('src/**/*.mjs', mjsDev);
};
exports.minimize = mjs;
