
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.distribuidores')
        .controller('distribuidorFormController', Controller);

    Controller.$inject = ['$scope', '$state', '$stateParams', 'distribuidorService','SweetAlert'];
    function Controller($scope, $state, $stateParams, distribuidorService, SweetAlert) {
        if (!$stateParams.id) {
            $scope.entity = {};
            $scope.entity.pai = {};
        }else{
            distribuidorService.get($stateParams.id).then(function(result){
                $scope.entity = result.data.data.data;
                console.log($scope.entity);
            }),
            function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao consultar dados", "error");
            };
        }
        $scope.distribuidores = [];
        distribuidorService.getAll()
            .then(function (result) {
                $scope.distribuidores = result.data.data.data;
                console.log($scope.distribuidores);
            });
        
        $scope.selected = undefined;
        
        $scope.getEndereco = function(){
            if($scope.entity.cep.length == 8){
                distribuidorService.getEndereco($scope.entity.cep).then(function(result){
                    $scope.entity.endereco = result.data.logradouro;
                    $scope.entity.complemento = result.data.complemento;
                    $scope.entity.bairro = result.data.bairro;
                    $scope.entity.municipio = result.data.localidade;
                    $scope.entity.uf = result.data.uf;
                    $("#numero").focus();
                });;
                
            }
        };
        $scope.submit = function(){
            console.log($scope.entity.pai);
            if($scope.entity.pai){
                $scope.entity.pai = $scope.entity.pai.originalObject.id;
            }else{
                delete $scope.entity.pai;
            }
            if($stateParams.id){
                var request = distribuidorService.update($scope.entity);
                var title = "Editado!";
            }else{
                var request = distribuidorService.insert($scope.entity);
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
                        $state.go('app.distribuidores');
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
                    $state.go('app.distribuidores');
                }
            });
        }
    }
})();