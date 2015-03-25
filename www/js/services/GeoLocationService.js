angular.module('parisEasy.services')
    .factory('GeoLocationService', ['$q', '$http', '$ionicPlatform', '$ionicLoading',
        function($q, $http, $ionicPlatform, $ionicLoading) {
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
                },
                getPositionFromAddress: function(location) {
                    var geocoder = new google.maps.Geocoder();
                    var deferred = $q.defer();

                    geocoder.geocode({
                            'address': location
                        },
                        function(results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                var res = results[0];
                                if (res) {
                                    var position = {
                                        coords: {
                                            longitude: res.geometry.location.D,
                                            latitude: res.geometry.location.k
                                        }
                                    };
                                    deferred.resolve(position);
                                };
                            } else {
                                $ionicLoading.show({
                                    template: 'Impossible de localiser l\'adresse fournie. Merci de la vérifier.',
                                    duration: 2000
                                });
                                deferred.reject();
                            }
                        },
                        function(err) {
                            deferred.reject();
                        });

                    return deferred.promise;
                },
                getAddressFromPosition: function(position) {
                    var geocoder = new google.maps.Geocoder();
                    var deferred = $q.defer();

                    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                    geocoder.geocode({
                            'latLng': latlng
                        },
                        function(results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                if (results[1]) {
                                    deferred.resolve(results[1].formatted_address);
                                }
                            } else {
                                deferred.reject();
                            }
                        },
                        function(err) {
                            console.info(err);
                            deferred.reject();
                        });

                    return deferred.promise;
                }
            }
        }
    ])