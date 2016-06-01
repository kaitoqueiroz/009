
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.modulos')
        .controller('moduloController', Controller);

    Controller.$inject = ['$filter', 'ngTableParams', 'moduloService', 'SweetAlert'];
    function Controller($filter, ngTableParams, moduloService, SweetAlert) {
        var vm = this;
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

                    moduloService.paginate(page,vm.pesquisa)
                        .then(function (result) {
                            vm.tableParams.total(result.data.data.meta.pagination.total/result.data.data.meta.pagination.per_page);
                            $defer.resolve(result.data.data.data);
                        });
                }
            }
        );

        vm.search = function(){
            vm.tableParams.page(1);
            vm.tableParams.reload();
        }

        vm.delete = function(obj){
            sweetAlertConfig.title = "Tem certeja que deseja excluir este módulo?";

            SweetAlert.swal(sweetAlertConfig, function(isConfirm){
                if (isConfirm) {
                    moduloService.delete(obj.id).then(function(){
                        vm.tableParams.reload();
                        SweetAlert.swal("excluído!", "Módulo excluído com sucesso.", "success");
                    }, function(){
                        SweetAlert.swal("ERRO!", "Ocorreu um problema ao excluir", "error");
                    });
                } else {
                    SweetAlert.swal("Cancelado", "O módulo não foi excluído", "error");
                }
            });
        }
        vm.updateAtivo = function(obj){
            var acao = '';
            if(!obj.ativo){
                acao = 'des';
            }
            sweetAlertConfig.title = "Tem certeja que deseja "+acao+"ativar este módulo?";

            SweetAlert.swal(sweetAlertConfig, function(isConfirm){
                if (isConfirm) {
                    moduloService.update(obj).then(function(){
                        SweetAlert.swal(""+acao+"ativado!", "Módulo "+acao+"ativado com sucesso.", "success");
                    }, function(){
                        SweetAlert.swal("ERRO!", "Ocorreu um problema ao atualizar", "error");
                        obj.ativo = !obj.ativo;
                    });
                } else {
                    SweetAlert.swal("Cancelado", "O módulo não foi "+acao+"ativado", "error");
                    obj.ativo = !obj.ativo;
                }
            });
        }
    }
})();
