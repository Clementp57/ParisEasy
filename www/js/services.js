angular.module('parisEasy.services', [])

.factory('ParisApi', ['$q', '$http', function ($q, $http) {
    var token = "f624edf37a3ba2b5c1db2b231f273942a732be06b983b955d8c94147750e4451";
    var baseUrl = "http://api.paris.fr/api/data/1.0/";

    return {
        getCategories: function () {
            var deferred = $q.defer();
            var start = new Date().getTime(); //performance analyse

            var result = $http.get(baseUrl + "QueFaire/get_categories/?token=" + token).then(
                function (response) {
                    deferred.resolve(result);
                    console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms'); //debug
                    return response.data;
                },
                function () {
                    //$rootScope.notify('La connexion avec le serveur à échouée. Essayez de recharger la page.','error')
                });

            return deferred.promise;
        },
        getEquipements: function (catId, offset, limit) {
            var deferred = $q.defer();
            var start = new Date().getTime(); //performance analyse
            
            var url = baserUrl+"QueFaire/get_equipements/?token="+token;
            url+= "&cid="+catId;
            url+= "&offset="+offset;
            url+= "&limit="+limit;

            var result = $http.get(url).then(
                function (response) {
                    deferred.resolve(result);
                    console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms'); //debug
                    return response.data;
                },
                function () {
                    //$rootScope.notify('La connexion avec le serveur à échouée. Essayez de recharger la page.','error')
                }); 

            return deferred.promise;

        },
        getActivites: function (catId, tag, created, start, end, offset, limit) {
            var deferred = $q.defer();
            var start = new Date().getTime(); //performance analyse
            
            var url = baserUrl+"QueFaire/get_activites/?token="+token;
            url+= "&cid="+catId;
            url+= "&tag="+tag;
            url+= "&created="+created;
            url+= "&start="+start;
            url+= "&end="+end;
            url+= "&offset="+offset;
            url+= "&limit="+limit;

            var result = $http.get(url).then(
                function (response) {
                    deferred.resolve(result);
                    console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms'); //debug
                    return response.data;
                },
                function () {
                    //$rootScope.notify('La connexion avec le serveur à échouée. Essayez de recharger la page.','error')
                }); 

            return deferred.promise;
        },
        getActivity: function (id) {
            var deferred = $q.defer();
            var start = new Date().getTime(); //performance analyse
            
            var url = baserUrl+"QueFaire/get_activity/?token="+token;
            url+= "&id="+id;

            var result = $http.get(url).then(
                function (response) {
                    deferred.resolve(result);
                    console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms'); //debug
                    return response.data;
                },
                function () {
                    //$rootScope.notify('La connexion avec le serveur à échouée. Essayez de recharger la page.','error')
                }); 

            return deferred.promise;
        },
        getGeoActivities: function (catId, tag, created, start, end, lat, lon, radius, offset, limit) {
            var deferred = $q.defer();
            var start = new Date().getTime(); //performance analyse
            
            var url = baserUrl+"QueFaire/get_geo_activites/?token="+token;
            url+= "&cid="+catId;
            url+= "&tag="+tag;
            url+= "&created="+created;
            url+= "&start="+start;
            url+= "&end="+end;
            url+= "&lat="+lat;
            url+= "&lon="+lon;
            url+= "&radius="+radius;
            url+= "&offset="+offset;
            url+= "&limit="+limit;

            var result = $http.get(url).then(
                function (response) {
                    deferred.resolve(result);
                    console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms'); //debug
                    return response.data;
                },
                function () {
                    //$rootScope.notify('La connexion avec le serveur à échouée. Essayez de recharger la page.','error')
                }); 

            return deferred.promise;
        }
    };
}]);