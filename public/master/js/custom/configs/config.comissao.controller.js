
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.lancamentos')
        .controller('configComissaoController', Controller);

    Controller.$inject = ['$state', '$stateParams', '$filter', 'ngTableParams', 'configService', 'SweetAlert'];
    function Controller($state, $stateParams, $filter, ngTableParams, configService, SweetAlert) {
        var vm = this;
        configService.get(1).then(function(result){
            vm.entity = result.data;
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
        vm.submit = function(){
            
            var request = configService.update(vm.entity);
            var title = "Editado!";
            
            request.then(function(){
                SweetAlert.swal({
                   title: title,
                   type: "success",
                   showCancelButton: false,
                   confirmButtonText: "OK",
                   closeOnConfirm: true},
                function(isConfirm){ 
                    if (isConfirm) {
                        $state.go('app.config_comissao');
                    }
                });
            }, function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao cadastrar", "error");
            });
        }

        vm.search = function(){
            vm.tableParams.page(1);
            vm.tableParams.reload();
        }
    }
})();
