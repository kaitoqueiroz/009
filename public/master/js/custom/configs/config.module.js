(function() {
    'use strict';

    angular
        .module('app.configs', [
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
            .state('app.config_comissao', {
                url: '/configs/comissao',
                controller: 'configComissaoController',
                templateUrl: helper.basepath('pages/configs/comissao.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
            .state('app.config_senha', {
                url: '/configs/senha',
                controller: 'configSenhaController',
                templateUrl: helper.basepath('pages/configs/mudar_senha.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
    }
})();