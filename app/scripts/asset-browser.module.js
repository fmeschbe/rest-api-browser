'use strict';

require('angular');
require('angular-ui-router');
require('angular-bootstrap-npm');
require('ng-file-upload/dist/angular-file-upload');

var BreadcrumbController = require('./breadcrumb.ctrl.js');
var ActionController = require('./action.ctrl.js');
var ActionDirective = require('./action.directive.js');
var BrowserController = require('./browser.ctrl.js');
var RoutingConfig = require('./routing.js');
var AssetAPIProvider = require('./api.service.js');

angular
  .module('assetBrowser', ['ui.router', 'ui.bootstrap', 'angularFileUpload'])
  .config(RoutingConfig)
  .controller('BreadcrumbController', BreadcrumbController)
  .controller('ActionController', ActionController)
  .controller('BrowserController', BrowserController)
  .directive('action', ActionDirective)
  .factory('assetAPI', AssetAPIProvider)
  .run(preventCachingOnReload)
;


/* @ngInject */
function preventCachingOnReload($rootScope, $http) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (toState.name === 'browser' && fromParams.path === toParams.path) {
      $http.defaults.headers.common['Cache-Control'] = 'no-cache';
    }
  });

  $rootScope.$on('$stateChangeError', function() {
    delete $http.defaults.headers.common['Cache-Control'];
  });

  $rootScope.$on('$stateChangeSuccess', function() {
    delete $http.defaults.headers.common['Cache-Control'];
  });
}



  //.config(function($httpProvider) {
  //  //Enable cross domain calls
  //  $httpProvider.defaults.useXDomain = true;
  //  //$httpProvider.defaults.headers.common.Authorization = 'Basic YWRtaW46YWRtaW4=';
  //
  //  //Remove the header used to identify ajax call  that would prevent CORS from working
  //  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  //})

//require('./apiService');
//require('./routing');
//require('./BreadcrumbController');
//require('./BrowserController');

/*

TODO:
* custom type for url param path ui-router #1119
* leverage rel attributes of links
* implement paging (use properties/srn:paging)
* support actions
* entities of type assets/asset show the original rendition instead of a thumbnail


"rel" attribute mapping:
  * links
    - self: self
    - parent: back, breadcrumb
    - content: download
    - thumbnail: overview
  * entities
    - child: child
    * links
      - self
      - content (only class assets/asset)


 */
