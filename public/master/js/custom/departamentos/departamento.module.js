(function() {
    'use strict';

    angular
        .module('app.departamentos', [
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
            .state('app.departamentos', {
                url: '/departamentos/list',
                templateUrl: helper.basepath('pages/departamentos/list.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
            .state('app.departamentos_create', {
                url: '/departamentos/create',
                controller: 'departamentoFormController',
                templateUrl: helper.basepath('pages/departamentos/form.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
            .state('app.departamentos_edit', {
                url: '/departamentos/edit/:id',
                controller: 'departamentoFormController',
                templateUrl: helper.basepath('pages/departamentos/form.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
    }
})();