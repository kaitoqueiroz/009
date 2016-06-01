(function() {
    'use strict';

    angular
        .module('app.funcionarios')
        .controller('funcionarioFormController', Controller)
        .controller('PerfilTableCtrl', PerfilTableCtrl)
        .controller('DepartamentoTableCtrl', DepartamentoTableCtrl)
        .controller('FilialTableCtrl', FilialTableCtrl);

    PerfilTableCtrl.$inject=['$scope','$filter', '$http','SweetAlert'];
    DepartamentoTableCtrl.$inject=['$scope','$filter', '$http','SweetAlert'];
    FilialTableCtrl.$inject=['$scope','$filter', '$http','SweetAlert'];

    Controller.$inject=['$scope', 
                        '$state', 
                        '$stateParams', 
                        'funcionarioService',
                        'perfilService',
                        'departamentoService',
                        'filialService',
                        'SweetAlert'];
    function Controller($scope, 
                        $state, 
                        $stateParams, 
                        funcionarioService, 
                        perfilService, 
                        departamentoService, 
                        filialService, 
                        SweetAlert) 
    {        
        perfilService.paginate(1)
            .then(function (result) {
                $scope.perfis = result.data.data.data;
            });
        departamentoService.paginate(1)
            .then(function (result) {
                $scope.departamentos = result.data.data.data;
            });
        filialService.paginate(1)
            .then(function (result) {
                $scope.filiais = result.data.data.data;
            });

        if (!$stateParams.id) {

            $scope.entity = [];
            $scope.entity.ativo = true;
            $scope.entity.login = null;
            $scope.entity.nome = null;
            $scope.entity.cod_vendedor = null;
            $scope.entity.perfis = [];
            $scope.entity.departamentos = [];
            $scope.entity.filiais = [];
        }else{
            funcionarioService.get($stateParams.id).then(function(result){
                $scope.entity = [];
                $scope.entity.id = result.data.data.id;
                $scope.entity.ativo = (result.data.data.ativo)?true:false;
                $scope.entity.login = result.data.data.login;
                $scope.entity.nome = result.data.data.nome;
                $scope.entity.cod_vendedor = result.data.data.cod_vendedor;
                $scope.entity.perfis = result.data.data.perfis;
                $scope.entity.departamentos = result.data.data.departamentos;
                $scope.entity.filiais = result.data.data.filiais;
            }),
            function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao consultar dados", "error");
            };
        }

        $scope.submit = function(){
            if(!$scope.entity.login){
                SweetAlert.swal("ERRO!", "Preencha o campo 'Login do Funcionário'", "error");
                angular.element('#login').trigger('focus');
                return;
            }
            if(!$scope.entity.nome){
                SweetAlert.swal("ERRO!", "Preencha o campo 'Nome do Funcionário'", "error");
                angular.element('#nome').trigger('focus');
                return;
            }
            if(!$scope.entity.cod_vendedor){
                SweetAlert.swal("ERRO!", "Preencha o campo 'Código do Vendedor'", "error");
                angular.element('#cod_vendedor').trigger('focus');
                return;
            }

            var perfis = [];
            var departamentos = [];
            var filiais = [];

            $scope.entity.perfis.forEach(function(perfil){
                perfis.push(perfil.id);
            });
            $scope.entity.departamentos.forEach(function(departamento){
                departamentos.push(departamento.id);
            });
            $scope.entity.filiais.forEach(function(filial){
                filiais.push(filial.id);
            });

            var save_obj = {
                id: $scope.entity.id,
                login: $scope.entity.login,
                ativo: $scope.entity.ativo,
                nome: $scope.entity.nome,
                cod_vendedor: $scope.entity.cod_vendedor,
                perfis: perfis,
                departamentos: departamentos,
                filiais: filiais
            }
                
            if($stateParams.id){
                var request = funcionarioService.update(save_obj);
                var title = "Editado!";
            }else{
                var request = funcionarioService.insert(save_obj);
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
                        $state.go('app.funcionarios');
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
                    $state.go('app.funcionarios');
                }
            });
        }
    }
    function PerfilTableCtrl($scope, $filter, $http, SweetAlert) {
        
        $scope.remove = function(index) {
            $scope.entity.perfis.splice(index, 1);
        };
        $scope.add = function() {
            var obj = $scope.entity.perfis.filter(function(obj){
                return $scope.perfil_search.id == obj.id;
            });
            if(!obj.length){
                $scope.entity.perfis.push($scope.perfil_search);
            }else{
                SweetAlert.swal("ERRO!", "O item selecionado já foi adicionado.", "error");
            }
            $scope.perfil_search = undefined;
        };
    }
    function DepartamentoTableCtrl($scope, $filter, $http, SweetAlert) {
        
        $scope.remove = function(index) {
            $scope.entity.departamentos.splice(index, 1);
        };
        $scope.add = function() {
            var obj = $scope.entity.departamentos.filter(function(obj){
                return $scope.departamento_search.id == obj.id;
            });
            if(!obj.length){
                $scope.entity.departamentos.push($scope.departamento_search);
            }else{
                SweetAlert.swal("ERRO!", "O item selecionado já foi adicionado.", "error");
            }
            $scope.departamento_search = undefined;
        };
    }
    function FilialTableCtrl($scope, $filter, $http, SweetAlert) {
        
        $scope.remove = function(index) {
            $scope.entity.filiais.splice(index, 1);
        };
        $scope.add = function() {
            var obj = $scope.entity.filiais.filter(function(obj){
                return $scope.filial_search.id == obj.id;
            });
            if(!obj.length){
                $scope.entity.filiais.push($scope.filial_search);
            }else{
                SweetAlert.swal("ERRO!", "O item selecionado já foi adicionado.", "error");
            }
            $scope.filial_search = undefined;
        };
    }
})();
