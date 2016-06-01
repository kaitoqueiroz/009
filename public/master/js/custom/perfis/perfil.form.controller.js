
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('app.perfis')
        .controller('perfilFormController', Controller);

    Controller.$inject = ['$scope', '$state', '$stateParams', 'perfilService', 'SweetAlert'];
    function Controller($scope, $state, $stateParams, perfilService, SweetAlert) {
        $scope.modulos_funcionalidades = [];
        var promiseModulosFuncionalidades = perfilService.getModulosFuncionalidades().
            then(function(result){
                return result.data.data;
        },function(){
            SweetAlert.swal("ERRO!", "Ocorreu um problema ao consultar dados", "error");
        });

        if (!$stateParams.id) {
            $scope.descricao = null;
            $scope.nivel_privilegio = null;
            $scope.ativo = true;
            $scope.funcionalidades = [];
            promiseModulosFuncionalidades.then(function(result){
                $scope.modulos_funcionalidades = result;
            });
        }else{
            perfilService.get($stateParams.id).then(function(result){
                $scope.id = result.data.id;
                $scope.descricao = result.data.descricao;
                $scope.nivel_privilegio = result.data.nivel_privilegio;
                $scope.ativo = (result.data.ativo) ? true : false;
                $scope.funcionalidades = result.data.funcionalidades;


                promiseModulosFuncionalidades.then(function(resultPromise){
                    
                    resultPromise = resultPromise.forEach(function(modulo){
                        var count_checked = 0;
                        modulo.funcionalidades.forEach(function(element,index){
                            var res = $scope.funcionalidades.filter(function(fill){
                                return fill.id == element.id;
                            });
                            element.checked = (res.length>0);
                            if(res.length>0){
                                count_checked++;
                            }
                        });
                        modulo.checked = (modulo.funcionalidades.length == count_checked);
                        $scope.modulos_funcionalidades.push(modulo);
                    });
                    return resultPromise;
                });
            }),
            function(){
                SweetAlert.swal("ERRO!", "Ocorreu um problema ao consultar dados", "error");
            };
        }

        $scope.submit = function(){
            if(!$scope.descricao){
                SweetAlert.swal("ERRO!", "Preencha o campo 'Descrição do Perfil'", "error");
                angular.element('#descricao').trigger('focus');
                return;
            }
            if(!$scope.nivel_privilegio){
                SweetAlert.swal("ERRO!", "Preencha o campo 'Nível de Privilégio'", "error");
                angular.element('#nivel_privilegio').trigger('focus');
                return;
            }
            $scope.funcionalidades = [];
            $scope.modulos_funcionalidades.forEach(function(modulo){
                modulo.funcionalidades.forEach(function(funcionalidade){
                    if(funcionalidade.checked){
                        $scope.funcionalidades.push(funcionalidade.id);
                    }
                });
            });

            var obj = {
                id: $scope.id,
                descricao: $scope.descricao,
                nivel_privilegio: $scope.nivel_privilegio,
                ativo: $scope.ativo,
                funcionalidades: $scope.funcionalidades
            }
                
            if($stateParams.id){
                var request = perfilService.update(obj);
                var title = "Editado!";
            }else{
                var request = perfilService.insert(obj);
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
                        $state.go('app.perfis');
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
                    $state.go('app.perfis');
                }
            });
        }
        $scope.checkModulo = function(modulo){
            modulo.funcionalidades.forEach(function(obj){
                obj.checked = modulo.checked;
            });
        };
        $scope.checkFuncionalidade = function(modulo){
            var count_checked = 0;
            modulo.funcionalidades.forEach(function(obj){
                if(obj.checked) count_checked++;
            });

            modulo.checked = (count_checked == modulo.funcionalidades.length);
        };
    }
})();
