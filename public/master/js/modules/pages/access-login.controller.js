/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.pages')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['$http', '$state'];
    function LoginFormController($http, $state) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          // bind here all data from the form
          vm.account = {};
          // place the message if something goes wrong
          vm.authMsg = '';

          vm.login = function() {
            vm.authMsg = '';

            if(vm.loginForm.$valid) {
              $http
                .post('api/login', {username: vm.account.username, password: vm.account.password})
                .then(function(response) {
                  // assumes if ok, response is an object with some data, if not, a string with error
                  // customize according to your api
                  if ( !response.data ) {
                    vm.authMsg = 'Login incorreto.';
                  }else{
                    $state.go('app.singleview');
                  }
                }, function(response) {
                  console.log(response);
                  if(response.data.error == 401){
                    vm.authMsg = response.data.message;
                  }else{
                    vm.authMsg = 'Erro de conexão com o servidor.';
                  }
                });
            }
            else {
              // set as dirty if the user click directly to login so we show the validation messages
              /*jshint -W106*/
              vm.loginForm.account_email.$dirty = true;
              vm.loginForm.account_password.$dirty = true;
            }
          };

          vm.logout = function() {
            $http.get('sessions/logout').then(function(response) {
              $state.go('login');
            });
          }
        }
    }
})();
