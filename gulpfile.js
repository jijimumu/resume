var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var minifyCSS = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var fs = require('fs');
var uglify = require('gulp-uglify');
var reactify = require('reactify');
var jasmine = require('gulp-jasmine');
var less = require('gulp-less');
var lessImport = require('gulp-less-import');
var path = require('path');
var babel = require("gulp-babel");
var babelify = require("babelify");
// 環境變數
var env = 'prod'; // dev||prod

var live = livereload();
livereload.listen();


// 路徑變數
var paths = {
    // main: './app/js/boot.js',
    main: './app/js/boot.js',
    css: './app/assets/css/*.css',
    destDir: 'build',
    destCSS: 'build/assets/css'
};

gulp.task('material-ui-components', function () {
    return gulp.src('./node_modules/material-ui/src/less/**/*.less')
        .pipe(lessImport('components.less'))
        .pipe(less())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('material-ui-scaffolding', function () {
    return gulp.src('./node_modules/material-ui/src/less/**/*.less')
        .pipe(lessImport('scaffolding.less'))
        .pipe(less())
        .pipe(gulp.dest('./build/css'));
});


function buildJS(boot, result){
    console.log( '\n build '+ boot+' run' );
    return browserify({
        entries:[ boot ],
        debug: true
    })
    .bundle()
    .on('error', function( err ){
        console.log( '[ERROR]', err );
        this.end();
        gulp.src('').pipe( notify('✖ Bunlde Failed ✖') )
    })
    .pipe( source(result) )
    .pipe( gulp.dest('./build') );
}

gulp.task('app-js', function(){
    return buildJS('./app/js/app.jsx' , 'app.js');
});

gulp.task('provider-js', function() {

    return buildJS('./app/js/contract_provider_boot.jsx' , 'contract_provider.js');
    
});

gulp.task('contract-js', function() {

    return buildJS('./app/js/contract_contract_boot.js' , 'contract_contract.js');
    
});

gulp.task('asset-js', function() {

    return buildJS('./app/js/asset_boot.js' , 'asset.js');
    
});

gulp.task('management-js', function() {

    return buildJS('./app/js/management_boot.jsx' , 'management.js');

});

gulp.task('publish-js', function() {

    return buildJS('./app/js/publish_boot.jsx' , 'publish.js');

});

gulp.task('buildJSFiles',['app-js','asset-js', 'provider-js', 'contract-js', 'management-js', 'publish-js']);
gulp.task('buildSPAFiles',['app-js']);

gulp.task('compress', function() {
    return gulp.src('./build/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build'));
});


/**
 * 監控 app/ 下所有 js, jsx, html, css 變化就重新編譯
 */

gulp.task('copy-portal', function(){
    gulp.src([ 'app/*.html' ], { base: 'app' } )
    .pipe( gulp.dest(paths.destDir));
});

gulp.task('copy-assets-js', function(){
    gulp.src('app/assets/**/*.*')
    .pipe( gulp.dest(paths.destDir+'/assets'));
});

gulp.task('copy-bower', function(){
    gulp.src('bower_components/**/*.*')
        .pipe( gulp.dest(paths.destDir+'/bower_components'));
});


gulp.task('watch-portal', function() {
    // console.log( 'watch 跑' );
    gulp.watch( 'app/**/*', ['buildSPAFiles', 'minify-css', 'copy-portal', 'copy-assets-js', 'copy-bower', 'refresh'] );
});


/**
 * 
 */
gulp.task('bundle-js', function() {
    
    // console.log( '\nbundle-js 跑' );

    return browserify({
        entries:[ paths.main ]
    })

    // 最優先編譯 jsx，確保後面其它 transform 運行無誤
    .transform( 'reactify' )

    // 所有檔案合併為一，並指定要生成 source map
    .bundle({debug: true})

    .on('error', function( err ){
        console.log( '[錯誤]', err );
        this.end();
        gulp.src('').pipe( notify('✖ Bunlde Failed ✖') )
    })
    
    // 利用 vinyl-source-stream 幫檔案取名字
    .pipe( source('bundle.js') )
    
    // 接著就回到 gulp 系統做剩下事
    // 這裏是直接存檔到硬碟
    .pipe( gulp.dest('./build') )
    
});

/**
 * 縮短 app.css
 */
gulp.task('minify-css', function() {
  gulp.src( paths.css )
    .pipe(minifyCSS(
      {
          noAdvanced: false,
          keepBreaks:true,
          cache: true // 這是 gulp 插件獨有的
      }))
    .pipe(gulp.dest( paths.destCSS ))
});


/**
 * 將 index.html 與 css/ 複製到 build/ 下面
 * 才方便測試
 */
gulp.task('copy', function(){
    gulp.src([ 'app/index.html' ], { base: 'app' } )
    .pipe( gulp.dest(paths.destDir));
    gulp.src([ 'app/master.html' ], { base: 'app' } )
    .pipe( gulp.dest(paths.destDir));
    gulp.src([ 'app/pompom.html' ], { base: 'app' } )
    .pipe( gulp.dest(paths.destDir));
});




/**
 * livereload refresh
 */
gulp.task( 'refresh', function(){
    // console.log( '\nlivereload > refresh\n' );
    setTimeout(function(){
      live.changed('');
    }, 1000)
});

//Test
gulp.task('unitTest',function(){
    return gulp.src('__tests__/TagStore-test.js').pipe(jasmine({integration: true}));
});

//========================================================================
//
// 總成的指令集


/**
 * 初期讓 default 就是跑 dev task，將來可能會改成有 build, deploy 等花樣
 */
gulp.task('default', ['portal']);

/**
 * 編譯與打包 jsx 為一張檔案
 * 廣播 livereload 事件
 * 啟動 8000 server 供本地跑
 */
gulp.task('deployment', ['compress'] );

gulp.task('portal', ['buildSPAFiles', 'minify-css', 'copy-portal', 'copy-assets-js', 'copy-bower', 'watch-portal'] );

