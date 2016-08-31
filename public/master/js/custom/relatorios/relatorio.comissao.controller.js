
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.lancamentos')
        .controller('relatorioComissaoController', Controller);

    Controller.$inject = ['$scope', '$filter', 'ngTableParams', 'lancamentoService', 'distribuidorService', 'SweetAlert'];
    function Controller($scope, $filter, ngTableParams, lancamentoService, distribuidorService, SweetAlert) {
        var vm = this;
        vm.entity = {};
        vm.entity.distribuidor = null;
        $scope.distribuidores = [];
        distribuidorService.getAll()
            .then(function (result) {
                $scope.distribuidores = result.data.data.data;
            });
        var sweetAlertConfig = {
               //text: "Your will not be able to recover this imaginary file!",
               type: "warning",
               showCancelButton: true,
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Sim",
               cancelButtonText: "Não",
               closeOnConfirm: false,
               closeOnCancel: false };
        vm.pesquisa = '';
        vm.saldo_total = 0;

        vm.tableParams = new ngTableParams([
                {
                    page: 1, 
                    count: 15
                }],
            {
                counts: [],
                getData: function ($defer, params) {
                    var filter = params.filter();
                    var sorting = params.sorting();
                    var count = params.count();
                    var page = params.page();
                    var download = params.download;
                    
                    var arr = [];
                    angular.forEach(vm.entity,function(obj,index){
                        if(obj != null){
                            if(obj.originalObject && index == "distribuidor"){
                                index = "destino";
                                obj = obj.originalObject.id;
                            }
                        }
                        if(obj){
                            arr.push(index+":"+obj);
                        }
                    });
                    
                    if(download){
                        var search = '';
                        if(arr.join(";")){
                            search = '&search='+arr.join(";");
                        }
                        var anchor = angular.element('<a/>');
                        anchor.attr({
                            href: 'api/comissoes?download=true' + search,
                            target: '_blank',
                            download: 'comissoes_'+Date.now()+'.pdf'
                        })[0].click();
                    }else{
                        lancamentoService.paginateComissoes(page,arr.join(";"))
                            .then(function (result) {
                                vm.tableParams.total(result.data.data.total/result.data.data.per_page);
                                $defer.resolve(result.data.data.data);
                                vm.saldo_total = result.data.saldo_total;
                            });
                    }
                }
            }
        );

        vm.search = function(){
            vm.tableParams.page(1);
            vm.tableParams.reload();
        }

        vm.download = function(){
            vm.tableParams.download = true;
            vm.tableParams.page(1);
            vm.tableParams.reload();
        }
    }
})();
