angular.module('parisEasy.services')
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