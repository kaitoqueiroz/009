
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.departamentos')
        .controller('departamentoFormController', Controller);

    Controller.$inject = ['$scope', '$state', '$stateParams', 'departamentoService','SweetAlert'];
    function Controller($scope, $state, $stateParams, departamentoService, SweetAlert) {
        if (!$stateParams.id) {
            $scope.descricao = null;
        }else{
            departamentoService.get($stateParams.id).then(function(result){
                $scope.id = result.data.data.data.id;
                $scope.descricao = result.data.data.data.descricao;
            }),
            function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao consultar dados", "error");
            };
        }

        $scope.submit = function(){
            if(!$scope.descricao){
                SweetAlert.swal("ERRO!", "Preencha o campo 'Descrição do Departamento'", "error");
                angular.element('#descricao').trigger('focus');
                return;
            }
            var obj = {
                id: $scope.id,
                descricao: $scope.descricao
            }
                
            if($stateParams.id){
                var request = departamentoService.update(obj);
                var title = "Editado!";
            }else{
                var request = departamentoService.insert(obj);
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
                        $state.go('app.departamentos');
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
                    $state.go('app.departamentos');
                }
            });
        }
    }
})();
