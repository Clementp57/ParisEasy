angular.module('parisEasy.controllers')
    .controller('HomeCtrl', ['$scope', 'ParisApiService', '$state', '$rootScope', 'GeoLocationService',
        function($scope, ParisApiService, $state, $rootScope, GeoLocationService) {
            var self = this;
            self.displayMap = false;
            var filterCircle = null;
            var mapHome = null;
            self.requestHolder = {
              catId: 0,
              currentLocation: '',
              radius: 500,
              type: 'activity',
              position: {}
            };

            ParisApiService.getCategories().then(function(response) {
                self.categories = response.data;
            });

            self.updateFilterCircle = function() {
                if (filterCircle) {
                    filterCircle.setRadius(self.requestHolder.radius);
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
                                self.requestHolder.currentLocation = results[1].formatted_address;
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
                        self.requestHolder.position = position;
                        self.displayPosition(position);
                        $rootScope.$broadcast('loading:hide');
                        self.displayReverseGeoCode(position);
                    }, function(error) {
                        //GEOLOC FAILED (Timeout)
                        $rootScope.$broadcast('loading:hide');
                    });
            }
            
            self.search = function() {
              console.log(self.requestHolder);
              ParisApiService.setRequestHolder(self.requestHolder);
              $state.go('main.searchResults');
            }
        }
    ]);