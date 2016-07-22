(function() {
    'use strict';

    angular
        .module('app.relatorios', [
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
            .state('app.relatorio_saldo', {
                url: '/relatorios/saldo',
                controller: 'relatorioSaldoController',
                templateUrl: helper.basepath('pages/relatorios/saldo.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
            .state('app.relatorio_comissao', {
                url: '/relatorios/comissao',
                controller: 'relatorioComissaoController',
                templateUrl: helper.basepath('pages/relatorios/comissao.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
            .state('app.relatorio_pontuacao', {
                url: '/relatorios/pontuacao',
                controller: 'relatorioPontuacaoController',
                templateUrl: helper.basepath('pages/relatorios/pontuacao.html'),
                resolve: {
                    auth: function(auth) {
                        return auth.isAuth();
                    }
                }
            })
    }
})();