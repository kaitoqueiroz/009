
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.lancamentos')
        .controller('lancamentoFormController', Controller);

    Controller.$inject = ['$scope', '$state', '$stateParams', 'lancamentoService','SweetAlert'];
    function Controller($scope, $state, $stateParams, lancamentoService, SweetAlert) {
        if (!$stateParams.id) {
            $scope.entity = null;
        }else{
            lancamentoService.get($stateParams.id).then(function(result){
                $scope.entity = result.data.data.data;
                console.log($scope.entity);
            }),
            function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao consultar dados", "error");
            };
        }
        $scope.lancamentos = [];
        lancamentoService.getAll()
        .then(function (result) {
            $scope.lancamentos = result.data.data.data;
            console.log($scope.lancamentos);
        });
        
        $scope.selected = undefined;
        
        $scope.submit = function(){
            console.log($scope.entity.pai);
            if($scope.entity.pai){
                $scope.entity.pai = $scope.entity.pai.originalObject.id;
            }
            if($stateParams.id){
                var request = lancamentoService.update($scope.entity);
                var title = "Editado!";
            }else{
                var request = lancamentoService.insert($scope.entity);
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
                        $state.go('app.lancamentos');
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
                    $state.go('app.lancamentos');
                }
            });
        }
    }
})();