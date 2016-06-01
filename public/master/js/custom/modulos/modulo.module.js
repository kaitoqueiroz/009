(function() {
    'use strict';

    angular
        .module('app.modulos', [
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
            .state('app.modulos', {
                url: '/modulos/list',
                templateUrl: helper.basepath('pages/modulos/list.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
            .state('app.modulos_create', {
                url: '/modulos/create',
                controller: 'moduloFormController',
                templateUrl: helper.basepath('pages/modulos/form.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
            .state('app.modulos_edit', {
                url: '/modulos/edit/:id',
                controller: 'moduloFormController',
                templateUrl: helper.basepath('pages/modulos/form.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
    }
})();