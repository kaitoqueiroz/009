(function() {
    'use strict';

    angular
        .module('app.filiais', [
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
            .state('app.filiais', {
                url: '/filiais/list',
                templateUrl: helper.basepath('pages/filiais/list.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
            .state('app.filiais_create', {
                url: '/filiais/create',
                controller: 'filialFormController',
                templateUrl: helper.basepath('pages/filiais/form.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
            .state('app.filiais_edit', {
                url: '/filiais/edit/:id',
                controller: 'filialFormController',
                templateUrl: helper.basepath('pages/filiais/form.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
    }
})();