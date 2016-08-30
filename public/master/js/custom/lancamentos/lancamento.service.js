(function() {
    'use strict';

    angular
        .module('app.lancamentos')
        .service('lancamentoService', ['$http','$q', function ($http,$q) {

            var urlBase = 'api/lancamentos';

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
            
            this.paginateSaldo = function (page,search) {

                return $q(function(resolve, reject) {
                    if(search){
                        resolve($http.get(urlBase + '?page=' + page +'&search=' + search + '&comissao=true'));
                    }
                    resolve($http.get(urlBase + '?page=' + page));
                });
            };
            
            this.paginateComissoes = function (page,search) {

                return $q(function(resolve, reject) {
                    if(search){
                        resolve($http.get('api/comissoes?page=' + page +'&search=' + search));
                    }
                    resolve($http.get('api/comissoes?page=' + page));
                });
            };
            
            this.paginatePontos = function (page,search) {

                return $q(function(resolve, reject) {
                    if(search){
                        resolve($http.get('api/pontos?page=' + page +'&search=' + search));
                    }
                    resolve($http.get('api/pontos?page=' + page));
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
