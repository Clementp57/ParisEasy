angular.module('parisEasy.controllers')
    .controller('HomeCtrl', ['$scope', 'ParisApiService', '$state', '$rootScope', 'GeoLocationService', '$ionicLoading', '$ionicScrollDelegate',
        function($scope, ParisApiService, $state, $rootScope, GeoLocationService, $ionicLoading, $ionicScrollDelegate) {
            var self = this;
            var filterCircle = null;
            var mapHome = null;

            self.displayMap = false;
            self.requestHolder = {
                catId: 0,
                currentLocation: '',
                radius: 3000,
                type: 'activity',
                position: {}
            };

            //Map initialization
            L.mapbox.accessToken = 'pk.eyJ1IjoibXhpbWUiLCJhIjoiNWQ1cDZUcyJ9.SbzQquPm3IbTZluO90hA6A';
            mapHome = L.mapbox.map('mapHome')
                .setView([48.855584, 2.354613], 11)
                .addLayer(L.mapbox.tileLayer('examples.h186knp8'));

            //Categories
            ParisApiService.getCategories().then(function(response) {
                self.categories = response.data;
            });

            self.updateFilterCircle = function() {
                if (filterCircle) {
                    filterCircle.setRadius(self.requestHolder.radius);
                }
            }

            self.displayPosition = function(position) {
                var posOptions = {
                    timeout: 30000,
                    enableHighAccuracy: true,
                    maximumAge: 10000
                };
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                L.marker([lat, long]).addTo(mapHome);

                filterCircle = L.circle(L.latLng(lat, long), 3000, {
                    opacity: 0.4,
                    weight: 1,
                    fillOpacity: 0.4
                }).addTo(mapHome);

                self.displayMap = true;
                $ionicScrollDelegate.scrollBottom();
            }

            self.displayReverseGeoCode = function(position) {
                GeoLocationService.getAddressFromPosition(position).then(function(address) {
                    self.requestHolder.currentLocation = address;
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
                }, function(error) {
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
                } else if (self.requestHolder.currentLocation != '' && !self.requestHolder.position.coords) {
                    GeoLocationService.getPositionFromAddress(self.requestHolder.currentLocation).then(function(position) {
                        self.requestHolder.position = position;
                        ParisApiService.setRequestHolder(self.requestHolder);
                        if (self.requestHolder.type == 'activity') {
                            $state.go('main.searchActivitiesResults');
                        } else {
                            $state.go('main.searchEquipmentsResults');
                        }
                    });
                } else {
                    console.log(self.requestHolder);
                    ParisApiService.setRequestHolder(self.requestHolder);
                    if (self.requestHolder.type == 'activity') {
                        $state.go('main.searchActivitiesResults');
                    } else {
                        $state.go('main.searchEquipmentsResults');
                    }
                }

            }
        }
    ]);