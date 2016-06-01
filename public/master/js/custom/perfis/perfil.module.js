(function() {
    'use strict';

    angular
        .module('app.perfis', [
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
            .state('app.perfis', {
                url: '/perfis/list',
                templateUrl: helper.basepath('pages/perfis/list.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
            .state('app.perfis_create', {
                url: '/perfis/create',
                controller: 'perfilFormController',
                templateUrl: helper.basepath('pages/perfis/form.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
            .state('app.perfis_edit', {
                url: '/perfis/edit/:id',
                controller: 'perfilFormController',
                templateUrl: helper.basepath('pages/perfis/form.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
    }
})();