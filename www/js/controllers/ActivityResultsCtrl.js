angular.module('parisEasy.controllers')
    .controller('ActivityResultsCtrl', ['$scope', 'ParisApiService', '$stateParams', '$state',
        function($scope, ParisApiService, $stateParams, $state) {
            var self = this;
            $scope.limit = 10;
            $scope.offset = 0;
            $scope.url = "http://filer.paris.fr/";
            self.results = new Array();
            $scope.cat_id = $stateParams.cat_id;

            L.mapbox.accessToken = 'pk.eyJ1IjoibXhpbWUiLCJhIjoiNWQ1cDZUcyJ9.SbzQquPm3IbTZluO90hA6A';
            var map = L.mapbox.map('map')
                .setView([48.855584, 2.354613], 11)
                .addLayer(L.mapbox.tileLayer('examples.h186knp8'));

            ParisApiService.getActivities($scope.cat_id, '', '', '', '', 0, 10).then(function(response) {
                self.results = response.data;

                angular.forEach(self.results, function(value, key) {
                    var marker = L.marker([self.results[key].lat, self.results[key].lon]);
                    marker.addTo(map);
                    marker.on('click', function(e) {
                        $state.go('main.activityResult', {id: self.results[key].idactivites});
                    });
                });
            });

            $scope.loadData = function() {

                $scope.limit += 10;
                $scope.offset += 10

                ParisApiService.getActivities($scope.cat_id, '', '', '', '', $scope.offset, $scope.limit).then(function(response) {

                    angular.forEach(self.results, function(value, key) {
                        self.results.push(response.data[key]);
                    });

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });

            };

        }
    ]);