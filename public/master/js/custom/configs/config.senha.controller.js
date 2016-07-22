
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.lancamentos')
        .controller('configSenhaController', Controller);

    Controller.$inject = ['$state', '$stateParams', '$filter', 'ngTableParams', 'configService', 'SweetAlert'];
    function Controller($state, $stateParams, $filter, ngTableParams, configService, SweetAlert) {
        var vm = this;
        configService.get(1).then(function(result){
            vm.entity = result.data;
            console.log();
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
            if(vm.entity.senha != vm.entity.senha_antiga){
                SweetAlert.swal("ERRO!", "Senha antiga incorreta.", "error");
                return;
            }
            
            var request = configService.mudarSenha(vm.entity);
            var title = "Editado!";
            
            request.then(function(result){
                console.log(result);
                
                SweetAlert.swal({
                   title: title,
                   type: "success",
                   showCancelButton: false,
                   confirmButtonText: "OK",
                   closeOnConfirm: true},
                function(isConfirm){ 
                    if (isConfirm) {
                        $state.go('app.config_senha');
                    }
                });
            }, function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao cadastrar", "error");
            });
        }
        

        vm.cancelar = function(){
            SweetAlert.swal({
               title: "Deseja descartar todas as alterações?",
               type: "warning",
               showCancelButton: true,
               cancelButtonText: "Não",
               confirmButtonColor: "#DD6B55",
               confirmButtonText: "Sim",
               closeOnConfirm: true}, 
            function(onConfirm){ 
                if(onConfirm){
                    $state.go('app.config_senha');
                }
            });
        }
    }
})();
