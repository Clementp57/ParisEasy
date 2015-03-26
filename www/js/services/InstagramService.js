angular.module('parisEasy.services')
    .factory('InstagramService', ['$http',
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
    ]);