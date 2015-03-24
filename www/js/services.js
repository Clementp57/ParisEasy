angular.module('parisEasy.services', [])

.factory('ParisApi', ['$q', '$http',
    function($q, $http) {
        var token = "71b7030923bc73e5b897a2dc28653d4a40a7cec3533994868eeb43c2ebce899a";
        var baseUrl = "http://api.paris.fr/api/data/1.0/";
        var baseUrl_4 = "http://api.paris.fr/api/data/1.4/";

        return {
            getCategories: function() {
                var deferred = $q.defer();
                var start = new Date().getTime(); //performance analyse

                var result = $http.get(baseUrl + "QueFaire/get_categories/?token=" + token).then(
                    function(response) {
                        deferred.resolve(result);
                        console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms'); //debug
                        return response.data;
                    },
                    function() {
                        //$rootScope.notify('La connexion avec le serveur à échouée. Essayez de recharger la page.','error')
                    });

                return deferred.promise;
            },
            getEquipements: function(catId, offset, limit) {
                var deferred = $q.defer();
                var start = new Date().getTime(); //performance analyse

                var url = baseUrl + "QueFaire/get_equipements/?token=" + token;
                url += "&cid=" + catId;
                url += "&offset=" + offset;
                url += "&limit=" + limit;

                var result = $http.get(url).then(
                    function(response) {
                        deferred.resolve(result);
                        console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms'); //debug
                        return response.data;
                    },
                    function() {
                        //$rootScope.notify('La connexion avec le serveur à échouée. Essayez de recharger la page.','error')
                    });

                return deferred.promise;

            },
            getActivities: function(catId, tag, created, start, end, offset, limit) {
                var deferred = $q.defer();
                var start = new Date().getTime(); //performance analyse

                var url = baseUrl_4 + "QueFaire/get_activities/?token=" + token;
                url += "&cid=" + catId;
                url += "&tag=" + tag;
                url += "&created=" + created;
                url += "&start=" + start;
                url += "&end=" + end;
                url += "&offset=" + offset;
                url += "&limit=" + limit;

                var result = $http.get(url).then(
                    function(response) {
                        deferred.resolve(result);
                        console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms'); //debug
                        return response.data;
                    },
                    function() {
                        //$rootScope.notify('La connexion avec le serveur à échouée. Essayez de recharger la page.','error')
                    });

                return deferred.promise;
            },
            getActivity: function(id) {
                var deferred = $q.defer();
                var start = new Date().getTime(); //performance analyse

                var url = baseUrl + "QueFaire/get_activity/?token=" + token;
                url += "&id=" + id;

                var result = $http.get(url).then(
                    function(response) {
                        deferred.resolve(result);
                        console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms'); //debug
                        return response.data;
                    },
                    function() {
                        //$rootScope.notify('La connexion avec le serveur à échouée. Essayez de recharger la page.','error')
                    });

                return deferred.promise;
            },
            getGeoActivities: function(catId, tag, created, start, end, lat, lon, radius, offset, limit) {
                var deferred = $q.defer();
                var start = new Date().getTime(); //performance analyse
                var url = baseUrl + "QueFaire/get_geo_activities/?token=" + token;
                url += "&cid=" + catId;
                url += "&tag=" + tag;
                url += "&created=" + created;
                url += "&start=" + start;
                url += "&end=" + end;
                url += "&lat=" + lat;
                url += "&lon=" + lon;
                url += "&radius=" + radius;
                url += "&offset=" + offset;
                url += "&limit=" + limit;

                var result = $http.get(url).then(
                    function(response) {
                        deferred.resolve(result);
                        console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms'); //debug
                        return response.data;
                    },
                    function() {
                        //$rootScope.notify('La connexion avec le serveur à échouée. Essayez de recharger la page.','error')
                    });

                return deferred.promise;
            }
        };
    }
])

.factory('GeoLocationService', ['$q', '$http', '$ionicPlatform',
    function($q, $http, $ionicPlatform) {
        var posOptions = {
            timeout: 31000,
            enableHighAccuracy: true,
            maximumAge: 90000
        };

        var geolocation = false;
        if (navigator.geolocation) {
            geolocation = navigator.geolocation;
        }

        if (geolocation) {
            var locationService = geolocation; // native HTML5 geolocation
        } else {
            var locationService = navigator.geolocation; // cordova geolocation plugin
        }

        return {
            getCurrentPosition: function() {
                var deferred = $q.defer();
                $ionicPlatform.ready(function() {
                    //"Geolocation is not supported by this browser.";
                    locationService
                        .getCurrentPosition(function(position)  {
                            console.log('got it!');
                            deferred.resolve(position);
                        }, function(error) {
                            //
                            console.log('error', error);
                        });

                });

                return deferred.promise;
            }
        }
    }
])

.filter('fromTo', function() {
    return function(input, from, total, lessThan) {
        from = parseInt(from);
        total = parseInt(total);
        for (var i = from; i < from + total && i < lessThan; i++) {
            input.push(i);
        }
        return input;
    }
})
    .factory('instagram', ['$http',
        function($http) {
            var client_id = "0c17bb77f4744f0eb38181479f3f38f2";
            var token = "369623688.5b9e1e6.d7a47f7c44cf4f17a214b0392b300f2c";

            return {
                fetchPopular: function(callback) {

                    var endPoint = "https://api.instagram.com/v1/media/popular?client_id=" + client_id + "&callback=JSON_CALLBACK";
                    $http.jsonp(endPoint).success(function(response) {
                        callback(response.data);
                    });
                },

                getLocation: function(lat, lng, callback) {

                    var endPoint = "https://api.instagram.com/v1/locations/search?lat=" + lat + "&lng=" + lng + "&access_token=" + token + "&callback=JSON_CALLBACK";
                    $http.jsonp(endPoint).success(function(response) {
                        callback(response.data);
                    });
                },

                getImages: function(location, callback) {

                    var endPoint = "https://api.instagram.com/v1/locations/" + location + "/media/recent?access_token=" + token + "&callback=JSON_CALLBACK";
                    $http.jsonp(endPoint).success(function(response) {
                        callback(response.data);
                    });

                }
            }
        }
    ])


.factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
        id: 2,
        name: 'Andrew Jostlin',
        lastText: 'Did you get the ice cream?',
        face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
    }, {
        id: 3,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
        id: 4,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
    }];

    return {
        all: function() {
            return chats;
        },
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
});