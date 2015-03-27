angular.module('parisEasy.controllers')
    .controller('ActivityResultCtrl', ['$state', '$sanitize', '$ionicScrollDelegate', '$rootScope', '$scope', 'ParisApiService', '$stateParams', '$interval', 'InstagramService', 'GeoLocationService', '$ionicLoading', '$ionicPopup', 
        function($state, $sanitize, $ionicScrollDelegate, $rootScope, $scope, ParisApiService, $stateParams, $interval, InstagramService, GeoLocationService, $ionicLoading, $ionicPopup) {
            var self = this;
            $scope.result = null;
            $scope.url = "http://filer.paris.fr/";
            $scope.id = $stateParams.id;

            self.travelSteps = [];

            $scope.index = 0;

            var polyline = null;

            

            // Map
            L.mapbox.accessToken = 'pk.eyJ1IjoibXhpbWUiLCJhIjoiNWQ1cDZUcyJ9.SbzQquPm3IbTZluO90hA6A';
            var map_solo = L.mapbox.map('map_solo').setView([48.855584, 2.354613], 11).addLayer(L.mapbox.tileLayer('examples.h186knp8'));
            map_solo.featureLayer.on('click', function(e) {
                map_solo.panTo(e.layer.getLatLng());
            });

            ParisApiService.getActivity($scope.id).then(function(response) {
                $scope.result = response.data[0];
                console.log($scope.result);

                try {
                    map_solo.panTo([$scope.result.lat, $scope.result.lon]);
                } catch (error) {
                    console.log('failed to pan map...');
                }


                L.marker([$scope.result.lat, $scope.result.lon]).addTo(map_solo);

                $scope.locations = [];
                InstagramService.getLocation($scope.result.lat, $scope.result.lon, function(data) {
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        $scope.locations.push(data[i]);
                    }

                    var id_location = $scope.locations[0].id;

                    $scope.pics = [];
                    InstagramService.getImages(id_location, function(data) {
                        console.log(data);
                        for (var i = 0; i < data.length; i++) {
                            $scope.pics.push(data[i]);
                        }
                    });
                });
            }, function(error) {
                setTimeout(function() {
                    $state.go('main.home');
                }, 1500);
            });

            self.drawRoad = function(travelMode) {
                if (!$rootScope.userPosition) {
                    $ionicLoading.show({
                        template: "Nous calculons votre position..."
                    });
                    GeoLocationService.getCurrentPosition().then(function(result) {
                        $rootScope.userPosition = result;
                        L.marker([$rootScope.userPosition.coords.latitude, $rootScope.userPosition.coords.longitude]).addTo(map_solo);
                        $ionicLoading.hide();
                        self.showTravel(travelMode);
                    }, function(error) {});
                } else {
                    L.marker([$rootScope.userPosition.coords.latitude, $rootScope.userPosition.coords.longitude]).addTo(map_solo);
                    self.showTravel(travelMode);
                }
            }

            self.showTravel = function(travelMode) {
                if (polyline != null) {
                    map_solo.removeLayer(polyline);
                }
                var start = new google.maps.LatLng($rootScope.userPosition.coords.latitude, $rootScope.userPosition.coords.longitude);
                var end = new google.maps.LatLng($scope.result.lat, $scope.result.lon);
                GeoLocationService.computeRoute(start, end, travelMode).then(function(result) {
                    console.log('Result: ', result);

                    var steps = [];
                    angular.forEach(result.routes[0].overview_path, function(point) {
                        steps.push(L.latLng(
                            point.k,
                            point.D));
                    });
                    polyline = L.polyline(steps, {
                        color: 'red'
                    }).addTo(map_solo);
                    map_solo.fitBounds(polyline.getBounds());
                    self.travelSteps = result.routes[0].legs[0].steps;
                    $ionicScrollDelegate.scrollTop({
                        shouldAnimate: true
                    });
                }, function(error) {
                    $ionicLoading.show({
                        template: 'Impossible de calculer l\itinéraire, merci de réessayer.',
                        duration: 1000
                    });
                });
            }

            self.share = function() {
                var title = $rootScope.trustAsHtml($scope.result.nom);
                var description = $rootScope.trustAsHtml($scope.result.small_description);
                var imgUrl = $scope.result.media[0].path;
                try {
                  window.plugins.socialsharing.share(title, null, imgUrl, null); 
                } catch(error) {
                  console.log(error);
                  console.log(window.plugins);
                  console.log(window.plugins.socialsharing);
                  window.plugins.social.available(function(avail) {
                     if (avail) {
                       window.plugins.social.share('This is the message you want to share', 'http://someurl.com', 'www/image/local_image.jpg');
                     } else {
                       console.log("error " + avail);
                     }
                    });
                }
            }



        }
    ]);