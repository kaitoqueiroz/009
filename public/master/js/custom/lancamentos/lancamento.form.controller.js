
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.lancamentos')
        .controller('lancamentoFormController', Controller);

    Controller.$inject = ['$scope', '$state', '$stateParams', 'distribuidorService','lancamentoService','SweetAlert'];
    function Controller($scope, $state, $stateParams, distribuidorService, lancamentoService, SweetAlert) {
        if (!$stateParams.id) {
            $scope.entity = {};
            $scope.entity.distribuidor = {};
        }else{
            lancamentoService.get($stateParams.id).then(function(result){
                $scope.entity = result.data.data;
                $scope.entity.data = new Date($scope.entity.data.replace("-","/"));
                distribuidorService.get($scope.entity.distribuidor_id).then(function(res){
                    $scope.entity.distribuidor = res.data.data.data;
                });
            }),
            function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao consultar dados", "error");
            };
        }
        $scope.lancamentos = [];
        distribuidorService.getAll()
        .then(function (result) {
            $scope.distribuidores = result.data.data.data;
        });
        
        $scope.selected = undefined;
        
        $scope.submit = function(){
            if($scope.entity.distribuidor){
                $scope.entity.distribuidor_id = $scope.entity.distribuidor.originalObject.id;
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