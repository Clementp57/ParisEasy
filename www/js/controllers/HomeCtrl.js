angular.module('parisEasy')
    .controller('HomeCtrl', ['$scope', '$cordovaGeolocation', '$ionicPlatform', 'ParisApi', '$state', '$rootScope', 'GeoLocationService',
        function($scope, $cordovaGeolocation, $ionicPlatform, ParisApi, $state, $rootScope, GeoLocationService) {
            var self = this;
            self.currentLocation = "";
            self.radius = 500;
            self.displayMap = false;
            var filterCircle = null;
            var mapHome = null;

            ParisApi.getCategories().then(function(response) {
                self.categories = response.data;
            });

            self.updateFilterCircle = function() {
                if (filterCircle) {
                    filterCircle.setRadius(self.radius);
                }
            }

            self.displayPosition = function(position) {
                L.mapbox.accessToken = 'pk.eyJ1IjoibXhpbWUiLCJhIjoiNWQ1cDZUcyJ9.SbzQquPm3IbTZluO90hA6A';
                var mapHome = L.mapbox.map('mapHome')
                    .setView([48.855584, 2.354613], 11)
                    .addLayer(L.mapbox.tileLayer('examples.h186knp8'));

                var posOptions = {
                    timeout: 30000,
                    enableHighAccuracy: true,
                    maximumAge: 10000
                };
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                L.marker([lat, long]).addTo(mapHome);

                filterCircle = L.circle(L.latLng(lat, long), 500, {
                    opacity: 0.4,
                    weight: 1,
                    fillOpacity: 0.4
                }).addTo(mapHome);

                self.displayMap = true;
            }

            self.displayReverseGeoCode = function(position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(lat, long);
                geocoder.geocode({
                        'latLng': latlng
                    },
                    function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[1]) {
                                self.currentLocation = results[1].formatted_address;
                            }
                        }
                    },
                    function(err) {
                        console.info(err);
                    });
                return;
            }

            self.getLocation = function() {
                $rootScope.$broadcast('loading:show')
                GeoLocationService
                    .getCurrentPosition()
                    .then(function(position) {
                        console.log(position);
                        self.displayPosition(position);
                        $rootScope.$broadcast('loading:hide');
                        self.displayReverseGeoCode(position);
                    }, function(error) {
                        //GEOLOC FAILED (Timeout)
                        $rootScope.$broadcast('loading:hide');
                    });
            }
        }
    ]);