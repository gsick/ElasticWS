var gulp = require('gulp');
var gutil = require('gulp-util');

var paths = {
  /* Folder or file who must be deleted */
  clean: ['build/*'],
  /* Build destination folder */
  build: 'build',
  /* JS externs for closure compiler*/
  externs: ['lib/externs/traceur-runtime.js'],
}

/* Default task */
gulp.task('default', ['clean', 'traceur-compile', 'closure-compile','traceur-runtime-copy']);

/* Clean task */
var clean = require('gulp-clean');
gulp.task('clean', function(){
  return gulp.src(paths.clean, {read: false})
  .pipe(clean());
});

/* Traceur compiler */
var traceur = require('gulp-traceur');
gulp.task('traceur-compile', function () {
  return gulp.src('src/*.js')
  .pipe(traceur({sourceMaps: true, experimental: false}))
  .pipe(gulp.dest(paths.build));
});
/* Copy traceur runtime */
gulp.task('traceur-runtime-copy', function(){
  return gulp.src('node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js')
  .pipe(gulp.dest(paths.build));
});

/* Closure compiler */
var closureCompiler = require('gulp-closure-compiler');
gulp.task('closure-compile', /*['traceur-compile'],*/ function(){
  return gulp.src(paths.build + '/elasticws.js')
  .pipe(closureCompiler({
    compilation_level: "ADVANCED_OPTIMIZATIONS", 
    formatting: "PRETTY_PRINT",
    externs: paths.externs, 
    language_in: "ECMASCRIPT5_STRICT", 
    charset: "UTF-8"}))
  .pipe(gulp.dest(paths.build));
});

