
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.modulos')
        .controller('moduloFormController', Controller)
        .controller('EditableRowCtrl', EditableRowCtrl);

    Controller.$inject = ['$scope', '$state', '$stateParams', 'moduloService', 'SweetAlert'];
    EditableRowCtrl.$inject = ['$scope','$filter', '$http'];
    function Controller($scope, $state, $stateParams, moduloService, SweetAlert) {
        if (!$stateParams.id) {
            $scope.descricao = null;
            $scope.ativo = true;
            $scope.funcionalidades = [];
        }else{
            moduloService.get($stateParams.id).then(function(result){
                $scope.id = result.data.id;
                $scope.descricao = result.data.descricao;
                $scope.ativo = (result.data.ativo) ? true : false;
                $scope.funcionalidades = result.data.funcionalidades;
            }),
            function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao consultar dados", "error");
            };
        }

        $scope.submit = function(){
            if(!$scope.descricao){
                SweetAlert.swal("ERRO!", "Preencha o campo 'Descrição do Módulo'", "error");
                angular.element('#descricao').trigger('focus');
                return;
            }
            var obj = {
                id: $scope.id,
                descricao: $scope.descricao,
                ativo: $scope.ativo,
                funcionalidades: $scope.funcionalidades
            }
                
            if($stateParams.id){
                var request = moduloService.update(obj);
                var title = "Editado!";
            }else{
                var request = moduloService.insert(obj);
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
                        $state.go('app.modulos');
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
                    $state.go('app.modulos');
                }
            });
        }
    }
    function EditableRowCtrl($scope, $filter, $http) {
          
        $scope.groups = [];

        $scope.saveUser = function(data, id) {
            //$scope.funcionalidade not updated yet
            //angular.extend(data, {id: id});
                // return $http.post('/saveUser', data);
        };

            // remove funcionalidade
        $scope.removeUser = function(index) {
            $scope.funcionalidades.splice(index, 1);
        };

        // add funcionalidade
        $scope.addUser = function() {
            $scope.funcionalidades.push(
                {
                    nome: $scope.nome,
                    rota: $scope.rota
                }
            );

            $scope.nome ='';
            $scope.rota ='';
        };
    }
})();
