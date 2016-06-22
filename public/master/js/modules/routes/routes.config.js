/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$routeProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $routeProvider, $locationProvider, $urlRouterProvider, helper){
        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/login');

        // 
        // Application Routes
        // -----------------------------------   
        $stateProvider
            .state('login', {
                url: '/login',
                title: 'Login',
                controller: 'LoginFormController',
                templateUrl: 'app/pages/login.html'
            })
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: helper.basepath('app.html'),
                resolve: helper.resolveFor('modernizr', 'icons', 'xeditable', 'ngTable', 
                    'sweetalert','ngTagsInput','colorpicker','angucomplete-alt')
            })
            .state('app.singleview', {
                url: '/singleview',
                title: 'Single View',
                templateUrl: helper.basepath('singleview.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
          // 
          // CUSTOM RESOLVES
          //   Add your own resolves properties
          //   following this object extend
          //   method
          // ----------------------------------- 
          // .state('app.someroute', {
          //   url: '/some_url',
          //   templateUrl: 'path_to_template.html',
          //   controller: 'someController',
          //   resolve: angular.extend(
          //     helper.resolveFor(), {
          //     // YOUR RESOLVES GO HERE
          //     }
          //   )
          // })
          ;

    } // routesConfig

})();

