
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.lancamentos')
        .controller('lancamentoController', Controller);

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
        vm.saldo_total = '';

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
                    
                    var arr = [];
                    angular.forEach(vm.entity,function(obj,index){
                        if(obj != null){
                            if(obj.originalObject && index == "distribuidor"){
                                index = "distribuidor_id";
                                obj = obj.originalObject.id;
                            }
                        }
                        if(obj){
                            arr.push(index+":"+obj);
                        }
                    });
                    
                    lancamentoService.paginate(page,arr.join(";"))
                        .then(function (result) {
                            vm.tableParams.total(result.data.data.total/result.data.data.per_page);
                            $defer.resolve(result.data.data.data);
                            vm.saldo_total = result.data.saldo_total;
                        });
                }
            }
        );

        vm.search = function(){
            vm.tableParams.page(1);
            vm.tableParams.reload();
        }

        vm.distribuidorChange = function(){
            console.log(vm.entity.distribuidor);
        }

        vm.delete = function(obj){
            sweetAlertConfig.title = "Tem certeja que deseja excluir este lancamento?";

            SweetAlert.swal(sweetAlertConfig, function(isConfirm){
                if (isConfirm) {
                    lancamentoService.delete(obj.id).then(function(){
                        vm.tableParams.reload();
                        SweetAlert.swal("excluído!", "Lancamento excluído com sucesso.", "success");
                    }, function(){
                        SweetAlert.swal("ERRO!", "Ocorreu um problema ao excluir", "error");
                    });
                } else {
                    SweetAlert.swal("Cancelado", "O lancamento não foi excluído", "error");
                }
            });
        }
    }
})();
