(function() {
    'use strict';

    angular
        .module('app.routes')
        .factory('auth', ['$http', '$state', function($http, $state) {
          var sdo = {
            isAuth: function() {
              var promise = $http({
                  method: 'GET', 
                  url: 'sessions' 
              });
              promise.success(function(data, status, headers, conf) {
                return data;
              });
              promise.error(function(data, status, headers, conf){
                $state.go('login');
              });
              return promise;
            }
          }
          return sdo;
        }]);
})();