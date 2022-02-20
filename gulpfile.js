'use strict'
const { src, dest, parallel, watch } = require('gulp');
let sass          = require('gulp-sass');
let cleanCSS      = require('gulp-clean-css');
let concat        = require('gulp-concat');
let webpack       = require('webpack');
let webpackConfig = require('./webpack.config.js');
let browserSync   = require('browser-sync').create();
let del           = require('del');

// file matching regex
const fontFiles  = ['src/font/**/*.{ttf,woff,woff2,eot,svg}','node_modules/@fortawesome/fontawesome-free/webfonts/**/*.{ttf,woff,woff2,eot,svg}']; // matches all files in ./fonts
const imgFiles   = ['src/images/**/*.{gif,jpg,png,svg}']; // matches all files in  ./images
const styleFiles = ['src/**/*.scss','src/**/*.css']; // matches all css and scss ext in ./src
const jsFiles    = ['src/**/*.html','src/**/*.json', 'src/**/*.js', 'src/**/*.vue', 'env/*.env']; // matches all js and vue in ./src and all env files

// Env we are building for
const env = {
    local:{MODE:'development', ENV_FILE:'local'},
    dev:  {MODE:'development', ENV_FILE:'dev'},
    prod: {MODE:'production',  ENV_FILE:'prod'}
}

/**
 * Browser Sync server start up
 */
function BrowserSyncStart(){
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
}
/**
 * Webpack app Build   
 */
function BuildWebpack(config, watch){
    return new Promise((resolve, reject) => {
        webpack(config, (err, stats) => {
            if (err) {
                return reject(err)
            }
            if (stats.hasErrors()) {
                return reject(new Error(stats.compilation.errors.join('\n')))
            }
            resolve();
            if(watch){
                browserSync.reload();
            }
        })
    })
}
/**
 * gulp all style files to dist/css/style...
 *  
 */
function BuildStyles(prod, watch){
    CleanStyles();
    let job;
    if(prod){
        job = src(styleFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('style.min.css'))
        .pipe(dest('dist/css')); 
    }else{
        job= src(styleFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(dest('dist/css'));
    }
    if(watch){
        job.pipe(browserSync.stream());
    }
    return job;
}
function CopyImages(){
    CleanImages();
    src('src/**/*.ico').pipe(dest('dist'));
    return src(imgFiles).pipe(dest('dist/images'));
}
function CopyFonts(){
    CleanFonts();
    return src(fontFiles).pipe(dest('dist/font'));
}
function CleanAll(){   return del(['dist/**', '!dist']); }
function CleanImages(){  return  del(['dist/images/**','dist/*.ico', '!dist/images'],()=>{});}
function CleanFonts(){   return del(['dist/font/**', '!dist/font'],()=>{}); }
function CleanStyles(){   return del(['dist/css/**', '!dist/css'],()=>{}); }

// development build
function LocalWebpack(){  return BuildWebpack(webpackConfig(env.local), false); }
function DevWebpack(){    return BuildWebpack(webpackConfig(env.dev), false); }
function DevStyles(){     return BuildStyles(false, false); }
// watch development build
function LocalWebpackWatch(){  return BuildWebpack(webpackConfig(env.local), true); }
function DevWebpackWatch(){    return BuildWebpack(webpackConfig(env.dev), true); }
function DevStylesWatch(){     return BuildStyles(false, true); }
// production build
function ProdWebpack(){   return BuildWebpack(webpackConfig(env.prod),false); }
function ProdStyles(){    return BuildStyles(true, false); }


/**
 * Gulp Tasks
 */
function buildLocal (cb) {
    return LocalWebpack().then(()=> {
        parallel(DevStyles, CopyFonts, CopyImages)();
        cb()
    }).catch((e)=>{console.log(e);});
}
function buildDev (cb) {
    return DevWebpack().then(()=> {
        parallel(DevStyles, CopyFonts, CopyImages)();
        cb()
    }).catch((e)=>{console.log(e);});
}
function buildProd (cb) {
    return ProdWebpack().then(()=> {
        parallel(ProdStyles, CopyFonts, CopyImages)();
        cb()
    }).catch((e)=>{console.log(e);});
}



function watchLocal (cb) {
    buildLocal (()=>{
        BrowserSyncStart()
        watch(styleFiles, DevStylesWatch);
        watch(jsFiles, LocalWebpackWatch);
        watch(imgFiles, CopyImages);
        watch(fontFiles, CopyFonts);
    });
    cb();
}
function watchDev (cb) {
    buildDev (()=>{
        BrowserSyncStart();
        watch(styleFiles, DevStylesWatch);
        watch(jsFiles, DevWebpackWatch);
        watch(imgFiles, CopyImages);
        watch(fontFiles, CopyFonts);
    });
    cb();
}





/**
 * Export Task 
 *  i.e shell
 *  $ gulp watchLocal
 *  $ gulp watchDev
 *  .....
 */
// dev build
exports.buildLocal  = buildLocal; // with local api routes
exports.buildDev    = buildDev;   // with dev server api routes
//fire up browser-sync and watch for all changes in ./src
exports.watchLocal  = watchLocal; // buildLocal
exports.watchDev    = watchDev;  // buildDev


//prod build
exports.buildProd   = buildProd;

exports.copyImages = CopyImages;
exports.copyFonts  = CopyFonts;
exports.delImages  = CleanImages;
exports.delFonts   = CleanFonts;
exports.cleanAll   = CleanAll;