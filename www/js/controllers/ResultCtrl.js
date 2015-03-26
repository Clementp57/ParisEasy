angular.module('parisEasy')
    .controller('ResultCtrl', ['$scope', 'ParisApi', '$stateParams', '$interval', 'instagram',
        function($scope, ParisApi, $stateParams, $interval, instagram) {

            $scope.result = null;
            $scope.url = "http://filer.paris.fr/";
            $scope.id = $stateParams.id;
            console.log($scope.id);

            ParisApi.getActivity($scope.id).then(function(response) {

                $scope.result = response.data[0];

                // Map
                L.mapbox.accessToken = 'pk.eyJ1IjoibXhpbWUiLCJhIjoiNWQ1cDZUcyJ9.SbzQquPm3IbTZluO90hA6A';

                var map_solo = L.mapbox.map('map_solo')
                    .setView([$scope.result.lat, $scope.result.lon], 15)
                    .addLayer(L.mapbox.tileLayer('examples.h186knp8'));


                L.marker([$scope.result.lat, $scope.result.lon]).addTo(map_solo);
                console.log($scope.result);

                $scope.locations = [];
                instagram.getLocation($scope.result.lat, $scope.result.lon, function(data) {
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        $scope.locations.push(data[i]);
                    }

                    var id_location = $scope.locations[0].id;

                    $scope.pics = [];
                    instagram.getImages(id_location, function(data) {
                        console.log(data);
                        for (var i = 0; i < data.length; i++) {
                            $scope.pics.push(data[i]);
                        }
                    });

                    console.log($scope.pics);
                });



            });

        }
    ])