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
                        $state.go('main.activityResult', {
                            id: self.results[key].idactivites
                        });
                    });
                });
            });

            $scope.hasResults = true;

            $scope.loadData = function() {

                console.info("loading data");

                $scope.offset += 10

                if ($scope.hasResults) {

                    ParisApiService.getActivities($scope.cat_id, '', '', '', '', $scope.offset, 10).then(function(response) {

                        if (response.data.length == 0) {
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            $scope.hasResults = false;
                            return;
                        }

                        console.log(response);

                        angular.forEach(self.results, function(value, key) {
                            if (response.data[key] != undefined) {
                                console.log("+1");
                                self.results.push(response.data[key]);
                                return;
                            }
                        });
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });
                }

            };

            $scope.okForPaying = true;

            $scope.resultsFilter = function(element) {
                if (!$scope.okForPaying) {
                    if (!Boolean(parseInt(element.hasFee))) {
                        return true; // this will be listed in the results
                    }
                    return false;
                } else return true;
            };

        }
    ]);