/**
 * Brocfile.js 
 * @ref https://github.com/broccolijs/broccoli-sample-app/blob/master/Brocfile.js
 */


// Import some Broccoli plugins
var mergeTrees = require('broccoli-merge-trees'),
    assetRev = require('broccoli-asset-rev'),
    concat = require('broccoli-concat'),
    compileCompass = require('broccoli-compass-compiler'),
    pickFiles = require('broccoli-funnel'),
    uglifyJs = require('broccoli-uglify-sourcemap'),
    broccoliHandlebars = require('broccoli-handlebars'),
    environment = require('broccoli-env').getEnv(),
    isProduction = environment === 'production';

// create tree for files in app folder (no filters needed here)
var app = 'app';

// create tree for vendor folder (no filters needed here)
var vendor = 'vendor';

// Compile all the SCSS files in the  app/styles folder into a single app.css
var compiledCss = compileCompass(['app/styles'], {
    outputStyle: isProduction ? 'compressed' : 'expanded'
});

// include app and vendor source trees
var sourceTrees = [app, vendor, compiledCss];

// merge array into tree
var appAndDependencies = new mergeTrees(sourceTrees, { overwrite: true });

// Concatenate and compress all of our style files in the project /app
// and /vendor folder into a single app.css file in the assets folder
var appCss = concat(appAndDependencies, {
    inputFiles : ['**/*.css'],
    outputFile : '/assets/app.css',
    sourceMapConfig: { enabled: false }
});


// We need to specifically order jquery in the vendor/js folder and bootstrap
// transitions (since bootstrap collapse depends on this), so let's add the
// appropriate folders to the source tree
appAndDependencies = new mergeTrees(
    [appAndDependencies, 'vendor/js', 'vendor/js/bootstrap'],
    { overwrite: true });

// Concatenate and compress all of our JavaScript files in the project /app
// and /vendor folder into a single app.js file in the assets folder
var appJs = concat(appAndDependencies, {
    headerFiles: ['jquery-3.2.1.slim.min.js', 'transition.js'],
    inputFiles : ['*.js'],
    footerFiles: ['app.js'],
    outputFile : '/assets/app.js',
    sourceMapConfig: { enabled: false }
});
if (isProduction) {
    appJs = uglifyJs(appJs, {
        compress: true,
        sourceMapConfig: {
            enabled: false
        }
    });
}

// Generate all HTML files from handlebars templates and move from the
// /templates folder to the top level folder
var appHtml = new broccoliHandlebars([app], ['templates/*.hbs'], {
    partials: 'app/partials'
});
appHtml = pickFiles(appHtml, {
    srcDir: '/templates',
    destDir: '/'
});

// create tree for public folder (no filters needed here)
var publicFiles = 'public'

// Merge the compiled files into one output directory.
var tree = new mergeTrees([appJs,  appCss, appHtml, publicFiles], {
    overwrite: true
});


if (isProduction) {
    // Setup the asset compilation
    tree = new assetRev(tree, {
        extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg', 'json',
                     'pdf'],
        replaceExtensions: ['html', 'js', 'css', 'xml', 'json'],
        prepend: 'https://d3npmx50h79ju.cloudfront.net/'
    });
}

module.exports = tree;
