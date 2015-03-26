angular.module('parisEasy.controllers')
    .controller('HomeCtrl', ['$scope', 'ParisApiService', '$state', '$rootScope', 'GeoLocationService', '$ionicLoading', '$ionicScrollDelegate',
        function($scope, ParisApiService, $state, $rootScope, GeoLocationService, $ionicLoading, $ionicScrollDelegate) {
            var self = this;
            var filterCircle = null;
            var map_home = null;
            var marker = null;

            self.displayMap = false;
            self.requestHolder = {
                catId: 0,
                currentLocation: '',
                radius: 5000,
                type: 'activity',
                position: {}
            };

            document.addEventListener("deviceready", function() {
                if (navigator.connection && (navigator.connection.type == Connection.NONE || navigator.connection.type == Connection.UNKNOWN)) {
                    console.log(navigator.connection);
                    $ionicLoading.show({
                        template: 'Aucune connexion détectée, merci de vérifier vos paramètres de connexion',
                        duration: 10000
                    })
                }
            }, false);

            //Map initialization
            L.mapbox.accessToken = 'pk.eyJ1IjoibXhpbWUiLCJhIjoiNWQ1cDZUcyJ9.SbzQquPm3IbTZluO90hA6A';
            map_home = L.mapbox.map('mapHome')
                .setView([48.855584, 2.354613], 11)
                .addLayer(L.mapbox.tileLayer('examples.h186knp8'), {
                    zoomControl: false
                });

            // Disable drag and zoom handlers.
            map_home.dragging.disable();
            map_home.touchZoom.disable();
            map_home.doubleClickZoom.disable();
            map_home.scrollWheelZoom.disable();

            map_home.featureLayer.on('click', function(e) {
                map_home.panTo(e.layer.getLatLng());
            });

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
                if (marker != null) {
                    map_home.removeLayer(marker);
                }

                if (filterCircle != null) {
                    map_home.removeLayer(filterCircle);
                }
                var posOptions = {
                    timeout: 30000,
                    enableHighAccuracy: true,
                    maximumAge: 10000
                };
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                map_home.panTo([lat, long]);
                marker = L.marker([lat, long])
                marker.addTo(map_home);

                filterCircle = L.circle(L.latLng(lat, long), 5000, {
                    opacity: 0.4,
                    weight: 1,
                    fillOpacity: 0.4
                }).addTo(map_home);

                self.displayMap = true;
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
                        $rootScope.userPosition = position;
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
                    $rootScope.userPosition = position;
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
                        $rootScope.userPosition = position;
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