(function() {
    'use strict';

    angular
        .module('app.funcionarios', [
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
            .state('app.funcionarios', {
                url: '/funcionarios/list',
                templateUrl: helper.basepath('pages/funcionarios/list.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
            .state('app.funcionarios_create', {
                url: '/funcionarios/create',
                controller: 'funcionarioFormController',
                templateUrl: helper.basepath('pages/funcionarios/form.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
            .state('app.funcionarios_edit', {
                url: '/funcionarios/edit/:id',
                controller: 'funcionarioFormController',
                templateUrl: helper.basepath('pages/funcionarios/form.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
    }
})();