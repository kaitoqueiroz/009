
// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('custom')
        .controller('singleviewController', Controller);

    Controller.$inject = ['$log','$scope', 'auth'];
    function Controller($log,$scope,auth) {
        $scope.auth = auth.data; 
        // for controllerAs syntax
        // var vm = this;

        setTimeout(activate, 3000);

        function activate() {
          $log.log('I\'m a line from custom.js');
        }
    }
})();
