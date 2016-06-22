(function() {
    'use strict';

    angular
        .module('app.lancamentos', [
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
            .state('app.lancamentos', {
                url: '/lancamentos/list',
                templateUrl: helper.basepath('pages/lancamentos/list.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
            .state('app.lancamentos_create', {
                url: '/lancamentos/create',
                controller: 'lancamentoFormController',
                templateUrl: helper.basepath('pages/lancamentos/form.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
            .state('app.lancamentos_edit', {
                url: '/lancamentos/edit/:id',
                controller: 'lancamentoFormController',
                templateUrl: helper.basepath('pages/lancamentos/form.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
    }
})();