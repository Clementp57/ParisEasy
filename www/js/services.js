angular.module('parisEasy.services', [])

.factory('ParisApi', ['$q', '$http', function ($q, $http) {
    var token = "71b7030923bc73e5b897a2dc28653d4a40a7cec3533994868eeb43c2ebce899a";
    var baseUrl = "http://api.paris.fr/api/data/1.0/";
    var baseUrl_4 = "http://api.paris.fr/api/data/1.4/";

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
            
            var url = baseUrl+"QueFaire/get_equipements/?token="+token;
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
        getActivities: function (catId, tag, created, start, end, offset, limit) {
            var deferred = $q.defer();
            var start = new Date().getTime(); //performance analyse
            
            var url = baseUrl_4+"QueFaire/get_activities/?token="+token;
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
            
            var url = baseUrl+"QueFaire/get_activity/?token="+token;
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
            var url = baseUrl+"QueFaire/get_geo_activities/?token="+token;
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
