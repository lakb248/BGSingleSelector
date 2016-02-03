var TEST_REGEXP = /(spec|test)\.js$/i;
var allTestFiles = [];

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  // example of using a couple path translations (paths), to allow us to refer to different library dependencies, without using relative paths
  paths: {
    'angular': 'node_modules/angular/angular.min',
    'angularMock': 'node_modules/angular-mocks/angular-mocks',
    'jquery': 'node_modules/jquery/dist/jquery.min',
    'bgSingleSelector': 'src/bg-single-selector'
  },

  // example of using a shim, to load non AMD libraries (such as underscore)
  shim: {
    angular: {
        exports: 'angular',
        deps: ['jquery']
    },
    angularMock: {
        exports: 'angularMock',
        deps: ['angular']
    }
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
