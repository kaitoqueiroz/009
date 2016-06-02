(function() {
    'use strict';

    angular
        .module('app.distribuidores', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.routes',
            'app.core',
            'app.sidebar'
            /*...*/
        ])
        .config(routesConfig);

        routesConfig.$inject = ['$stateProvider', 'RouteHelpersProvider'];

        function routesConfig($stateProvider, helper){
            $stateProvider
            .state('app.distribuidores', {
                url: '/distribuidores/list',
                templateUrl: helper.basepath('pages/distribuidores/list.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
            .state('app.distribuidores_create', {
                url: '/distribuidores/create',
                controller: 'distribuidorFormController',
                templateUrl: helper.basepath('pages/distribuidores/form.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
            .state('app.distribuidores_edit', {
                url: '/distribuidores/edit/:id',
                controller: 'distribuidorFormController',
                templateUrl: helper.basepath('pages/distribuidores/form.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
    }
})();