/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.js';
import connect from 'gulp-connect';
import sass from 'gulp-sass';

const paths = {
    clientEntryPoint: 'src/app.tsx', //入口文件
    gulpFile: 'gulpfile.babel.js',
    webpackFile: 'webpack.config.babel.js',
    blueprintjsFile: './node_modules/@blueprintjs/core/dist/',
    distDir: 'dist', //dist目录
};

/**
* 1. copy blueprint相关包的资源文件到dist目录下
* 2. 定义一个清除dist目录的任务
* 3. 启动一个lving reloading的服务器
* 4. 监听dist目录下面的文件变动，如果发生变动自动刷新页面
* 5. 定义一个webpack打包的任务
* 6. 临时监听.tsx文件的变动，自动执行webpack打包流程
*/


//copy blueprint core包的css和字体文件
gulp.task('bp-copy-assets',[],()=>{

    const blueprintjsFile = paths.blueprintjsFile;
    gulp.src([`${blueprintjsFile}/assets/**`, `${blueprintjsFile}/blueprint.css`], {
            base: blueprintjsFile //保持原来的目录结构
        })
        .pipe(gulp.dest(paths.distDir))
    ;

});


//清空
gulp.task('clean', [],() => del([
  paths.distDir
]));


//启动一个服务器
gulp.task('server', function() {
  connect.server({
    root: paths.distDir,
    livereload: true,
    port:3333
  });
});


//webpack打包
gulp.task('webpack', [], () => {
    gulp.src(paths.clientEntryPoint)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(paths.distDir))
        .pipe(connect.reload())
})


// //监听dist目录的变化
// gulp.task('watch-dist', () => {
//   gulp.watch(paths.distDir+"./**/*", ['webpack']);

//   ;
// });


gulp.task('default',['server'])



// gulp.task('styles', [], () => gulp.src(PATHS.styles)
//   .pipe(plumber())
//   .pipe(sass())
//   .on('error', sass.logError)
//   .pipe(postcss([
//     autoprefixer(),
//     cssnano(),
//   ]))
//   .pipe(rename({ basename: 'bundle' }))
//   .pipe(gulp.dest(`${DESTROOT}/assets/css`))
//   .pipe(connect.reload())
// );





// gulp.task('html', function () {
//   gulp.src('./'+paths.distDir+'/*.html')
//     .pipe(connect.reload());
// });


// gulp.task('clean', () => del([
//   paths.libDir,
//   paths.clientBundle,
// ]));

// gulp.task('build', ['lint', 'clean'], () =>
//   gulp.src(paths.allSrcJs)
//     .pipe(babel())
//     .pipe(gulp.dest(paths.libDir))
// );

// gulp.task('main', [ 'clean'], () =>
//   gulp.src(paths.clientEntryPoint)
//     .pipe(webpack(webpackConfig))
//     .pipe(gulp.dest(paths.distDir))
// );

// gulp.task('watch', () => {
//   gulp.watch(paths.allSrcJs, ['main','html']);
// });


// gulp.task('default', ['blueprintjs','watch', 'main','connect']);
