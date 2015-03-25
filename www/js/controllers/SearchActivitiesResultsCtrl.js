angular.module('parisEasy.controllers')
    .controller('SearchActivitiesResultsCtrl', ['$scope', 'ParisApiService', '$stateParams', '$state',
        function($scope, ParisApiService, $stateParams, $state) {
            var self = this;
          
            $scope.limit = 10;
            $scope.offset = 0;

            ParisApiService.executeRequestHolder().then(function(response) {
                self.results = response.data;
                console.log(response);

                // Map
                L.mapbox.accessToken = 'pk.eyJ1IjoibXhpbWUiLCJhIjoiNWQ1cDZUcyJ9.SbzQquPm3IbTZluO90hA6A';
                var map = L.mapbox.map('mapActivities')
                    .setView([48.855584, 2.354613], 11)
                    .addLayer(L.mapbox.tileLayer('examples.h186knp8'));

                angular.forEach(self.results, function(value, key) {
                    L.marker([self.results[key].lat, self.results[key].lon]).addTo(map);
                });
            });

            $scope.loadData = function() {

                $scope.limit += 10;
                $scope.offset += 10

                ParisApiService.executeRequestHolder().then(function(response) {

                    angular.forEach(self.results, function(value, key) {
                        self.results.push(response.data[key]);
                    });

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });

            };


        }
    ]);