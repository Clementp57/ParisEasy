angular.module('parisEasy.controllers')
    .controller('ActivityResultCtrl', ['$rootScope', '$scope', 'ParisApiService', '$stateParams', '$interval', 'InstagramService', 'GeoLocationService',
        function($rootScope, $scope, ParisApiService, $stateParams, $interval, InstagramService, GeoLocationService) {

            $scope.result = null;
            $scope.url = "http://filer.paris.fr/";
            $scope.id = $stateParams.id;

            // Map
            L.mapbox.accessToken = 'pk.eyJ1IjoibXhpbWUiLCJhIjoiNWQ1cDZUcyJ9.SbzQquPm3IbTZluO90hA6A';
            var map_solo = L.mapbox.map('map_solo').setView([48.855584, 2.354613], 11).addLayer(L.mapbox.tileLayer('examples.h186knp8'));
            map_solo.featureLayer.on('click', function(e) {
                map_solo.panTo(e.layer.getLatLng());
            });

            ParisApiService.getActivity($scope.id).then(function(response) {

                $scope.result = response.data[0];

                map_solo.panTo([$scope.result.lat, $scope.result.lon]);

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

                if (!$rootScope.userPosition) {
                    GeoLocationService.getCurrentPosition().then(function(result) {
                        $rootScope.userPosition = result;
                        L.marker([$rootScope.userPosition.coords.latitude, $rootScope.userPosition.coords.longitude]).addTo(map_solo);
                        self.drawRoad();
                    });
                } else {
                    self.drawRoad();
                }

                self.drawRoad = function() {
                    var start = new google.maps.LatLng($rootScope.userPosition.coords.latitude, $rootScope.userPosition.coords.longitude);
                    var end = new google.maps.LatLng($scope.result.lat, $scope.result.lon);
                    console.log('Computing .... Start: ', start);
                    console.log('Computing .... End: ', end);
                    GeoLocationService.computeRoute(start, end, '').then(function(result) {
                        console.log('Result: ', result);

                        var steps = [];
                        angular.forEach(result.routes[0].overview_path, function(point) {
                            steps.push(L.latLng(
                                point.k,
                                point.D));
                        });
                        var polyline = L.polyline(steps, {
                            color: 'red'
                        }).addTo(map_solo);
                        map_solo.fitBounds(polyline.getBounds());

                        console.log('steps -> ' + steps);
                    });
                }

            });
        }
    ]);