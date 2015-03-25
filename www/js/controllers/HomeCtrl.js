angular.module('parisEasy.controllers')
    .controller('HomeCtrl', ['$scope', 'ParisApiService', '$state', '$rootScope', 'GeoLocationService', '$ionicLoading',
        function($scope, ParisApiService, $state, $rootScope, GeoLocationService, $ionicLoading) {
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
                GeoLocationService.getAddressFromPosition(position).then(function(adress) {
                    self.requestHolder.currentLocation = results[1].formatted_address;
                });
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
            };

            self.getPosition = function() {
                $rootScope.$broadcast('loading:show');
                GeoLocationService.getPositionFromAddress(self.requestHolder.currentLocation).then(function(position) {
                    self.requestHolder.position = position;
                    self.displayPosition(position);
                    $rootScope.$broadcast('loading:hide');
                }, function(error){
                    $rootScope.$broadcast('loading:hide');
                });
            }

            self.search = function() {
                if (!self.requestHolder.position.coords && self.requestHolder.currentLocation == '') {
                    $ionicLoading.show({
                        template: 'Merci de saisir une adresse.',
                        duration: 2000
                    });
                    return;
                } else if (self.requestHolder.currentLocation != '') {
                    GeoLocationService.getPositionFromAddress(self.requestHolder.currentLocation).then(function(position) {
                        self.requestHolder.position = position;
                        ParisApiService.setRequestHolder(self.requestHolder);
                        $state.go('main.searchResults');
                    });
                } else {
                    ParisApiService.setRequestHolder(self.requestHolder);
                    $state.go('main.searchResults');
                }

            }
        }
    ]);