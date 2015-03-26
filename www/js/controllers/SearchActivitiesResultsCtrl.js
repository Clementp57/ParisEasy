angular.module('parisEasy.controllers')
    .controller('SearchActivitiesResultsCtrl', ['$scope', 'ParisApiService', '$stateParams', '$state', '$rootScope',
        function($scope, ParisApiService, $stateParams, $state, $rootScope) {
            var self = this;
          
            $scope.offset = 0;

            ParisApiService.executeRequestHolder().then(function(response) {
                self.results = response.data;
                console.log(response);

                // Map
                L.mapbox.accessToken = 'pk.eyJ1IjoibXhpbWUiLCJhIjoiNWQ1cDZUcyJ9.SbzQquPm3IbTZluO90hA6A';
                var map = L.mapbox.map('mapActivities')
                    .setView([$rootScope.userPosition.coords.latitude, $rootScope.userPosition.coords.longitude], 16)
                    .addLayer(L.mapbox.tileLayer('examples.h186knp8'));

                angular.forEach(self.results, function(value, key) {
                    L.marker([self.results[key].lat, self.results[key].lon]).addTo(map);
                });
            });

            $scope.hasResults = true;

            $scope.loadData = function() {

                $scope.offset += 10

                if($scope.hasResults) {

                     ParisApiService.executeRequestHolder().then(function(response) {

                        if(response.data.length == 0) {
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            $scope.hasResults = false; 
                            return;
                        }

                        console.log(response);

                        angular.forEach(self.results, function(value, key) {
                            if(response.data[key] != undefined) {
                                console.log("+1");
                                self.results.push(response.data[key]);
                                return;
                            }
                        });     
                    }); 
                 }  

            };

            $scope.okForPaying = true;

            $scope.resultsFilter = function(element) {
                if(!$scope.okForPaying) {
                    if(!Boolean(parseInt(element.hasFee))) {
                        return true; // this will be listed in the results
                    }
                    return false;
                }
                else return true;
            };

            $scope.filterFunction = function(element) {
              console.info(Boolean(element.hasFee), $scope.okForPaying);
              return $scope.okForPaying = Boolean(parseInt(element.hasFee));
            };

            // Toggle list
            $scope.toggleGroup = function(group) {
                if ($scope.isGroupShown(group)) {
                  $scope.shownGroup = null;
                } else {
                  $scope.shownGroup = group;
                }
              };
              $scope.isGroupShown = function(group) {
                return $scope.shownGroup === group;
              };

        }
    ]);
