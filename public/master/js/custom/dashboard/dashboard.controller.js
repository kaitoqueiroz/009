
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('dashboardController', Controller);

    Controller.$inject = ['$filter', 'ngTableParams', 'dashboardService','filialService', 'SweetAlert'];
    function Controller($filter, ngTableParams, dashboardService, filialService, SweetAlert) {
        var vm = this;

        vm.loadFiliais = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadItens = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadReferencias = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadGrupos = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadSubgrupos = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadPrefixos = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadClientes = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadVendedores = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadAtividades = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadFornecedores = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadAplicadores = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadCidades = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadEstados = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadRiscos = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }
        vm.loadTabelas = function($query){
            return filialService.paginate(1,$query)
                .then(function (result) {
                    return result.data.data.data;
                });
        }

        vm.toggleFilters = function(){
            $("#filters").slideToggle();
        }
    }
})();
