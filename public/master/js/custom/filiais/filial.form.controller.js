
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.filiais')
        .controller('filialFormController', Controller);

    Controller.$inject = ['$scope', '$state', '$stateParams', 'filialService','SweetAlert'];
    function Controller($scope, $state, $stateParams, filialService, SweetAlert) {
        if (!$stateParams.id) {
            $scope.descricao = null;
        }else{
            filialService.get($stateParams.id).then(function(result){
                $scope.id = result.data.data.data.id;
                $scope.descricao = result.data.data.data.descricao;
            }),
            function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao consultar dados", "error");
            };
        }

        $scope.submit = function(){
            if(!$scope.descricao){
                SweetAlert.swal("ERRO!", "Preencha o campo 'Descrição do Filial'", "error");
                angular.element('#descricao').trigger('focus');
                return;
            }
            var obj = {
                id: $scope.id,
                descricao: $scope.descricao
            }
                
            if($stateParams.id){
                var request = filialService.update(obj);
                var title = "Editado!";
            }else{
                var request = filialService.insert(obj);
                var title = "Cadastrado!";
            }
            request.then(function(){
                SweetAlert.swal({
                   title: title,
                   type: "success",
                   showCancelButton: false,
                   confirmButtonText: "OK",
                   closeOnConfirm: true},
                function(isConfirm){ 
                    if (isConfirm) {
                        $state.go('app.filiais');
                    }
                });
            }, function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao cadastrar", "error");
            });
        }

        $scope.cancelar = function(){
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
                    $state.go('app.filiais');
                }
            });
        }
    }
})();
