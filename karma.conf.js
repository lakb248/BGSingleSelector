// Karma configuration
// Generated on Mon Feb 01 2016 21:34:22 GMT+0800 (中国标准时间)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
        'test/test-main.js',
        {pattern: 'node_modules/jquery/dist/jquery.min.js', included: false},
        {pattern: 'node_modules/angular/angular.min.js', included: false},
        {pattern: 'node_modules/angular-mocks/angular-mocks.js', included: false},
        {pattern: 'src/bg-single-selector.js', included: false},
        {pattern: 'test/selector.spec.js', included: false}
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'src/bg-single-selector.js': 'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'verbose'],

    coverageReporter:{
        reporters: [{
            type:'text-summary'
        }, {
            type: 'html',
            dir: 'test/coverage'
        }, {
            type: 'cobertura',
            subdir: '.',
            dir: 'test/coverage'
        }]
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    plugins: [
        'karma-jasmine',
        'karma-coverage',
        'karma-verbose-reporter',
        'karma-phantomjs-launcher',
        'karma-requirejs'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  })
}
