angular.module('parisEasy')
    .controller('ResultsCtrl', ['$scope', '$cordovaGeolocation', '$ionicPlatform', 'ParisApi', '$stateParams', '$ionicPopup', 
        function($scope, $cordovaGeolocation, $ionicPlatform, ParisApi, $stateParams, $ionicPopup) {
            var self = this;
            $scope.offset = 0;
            $scope.url = "http://filer.paris.fr/";
            self.results = new Array();
            $scope.cat_id = $stateParams.cat_id;
            //$scope.content.title = $stateParams.cat_name;

            ParisApi.getActivities($scope.cat_id, '', '', '', '', 0, 10).then(function(response) {
                console.log(response);
                self.results = response.data;

                // Map
                L.mapbox.accessToken = 'pk.eyJ1IjoibXhpbWUiLCJhIjoiNWQ1cDZUcyJ9.SbzQquPm3IbTZluO90hA6A';
                var map = L.mapbox.map('map')
                    .setView([48.855584, 2.354613], 11)
                    .addLayer(L.mapbox.tileLayer('examples.h186knp8'));

                angular.forEach(self.results, function(value, key) {
                    L.marker([self.results[key].lat, self.results[key].lon]).addTo(map);
                });
            });

            $scope.hasResults = true;

            $scope.loadData = function() {

                $scope.offset += 10

                if($scope.hasResults) {

                    ParisApi.getActivities($scope.cat_id, '', '', '', '', $scope.offset, 10).then(function(response) {

                        if(response.data.length == 0) {
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            $scope.hasResults = false; 
                            console.info("finished");
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

                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        console.log(self.results, $scope.offset);
                    });

                 }   

            };

            $scope.okForPaying = true;

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
    ])