(function() {
    'use strict';

    angular
        .module('app.distribuidores')
        .service('distribuidorService', ['$http','$q', function ($http,$q) {

            var urlBase = 'api/distribuidores';

            this.getAll = function () {
                return $q(function(resolve, reject) {
                    resolve($http.get(urlBase));
                });
            };
            
            this.paginate = function (page,search) {

                return $q(function(resolve, reject) {
                    if(search){
                        resolve($http.get(urlBase + '?page=' + page +'&search=descricao:' + search));
                    }
                    resolve($http.get(urlBase + '?page=' + page));
                });
            };

            this.search = function (query) {
                return $q(function(resolve, reject) {
                    resolve($http.get(urlBase + '?search=' + query));
                });
            };

            this.get = function (id) {
                return $q(function(resolve, reject) {
                    resolve($http.get(urlBase + '/' + id));
                });
            };

            this.insert = function (cust) {
                return $q(function(resolve, reject) {
                    resolve($http.post(urlBase, cust));
                });
            };

            this.update = function (cust) {
                return $q(function(resolve, reject) {
                    resolve($http.put(urlBase + '/' + cust.id, cust));
                });
            };

            this.delete = function (id) {
                return $q(function(resolve, reject) {
                    resolve($http.delete(urlBase + '/' + id));
                });
            };
        }]);
})();
