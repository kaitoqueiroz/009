(function() {
    'use strict';

    angular
        .module('app.configs')
        .service('configService', ['$http','$q', function ($http,$q) {

            var urlBase = 'api/config';

            this.getAll = function () {
                return $q(function(resolve, reject) {
                    resolve($http.get(urlBase));
                });
            };
            
            this.paginate = function (page,search) {

                return $q(function(resolve, reject) {
                    if(search){
                        resolve($http.get(urlBase + '?page=' + page +'&search=' + search));
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

            this.mudarSenha = function (cust) {
                return $q(function(resolve, reject) {
                    resolve($http.put(urlBase + '/mudar_senha/' + cust.id, cust));
                });
            };

            this.delete = function (id) {
                return $q(function(resolve, reject) {
                    resolve($http.delete(urlBase + '/' + id));
                });
            };

            this.getEndereco = function (cep) {
                return $q(function(resolve, reject) {
                    resolve($http.get("https://viacep.com.br/ws/"+cep+"/json/"));
                });
            };
        }]);
})();
