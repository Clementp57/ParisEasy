angular.module('parisEasy.controllers')
    .controller('SearchEquipmentsResultsCtrl', ['$scope', 'ParisApiService', '$stateParams', '$state', '$rootScope',
        function($scope, ParisApiService, $stateParams, $state, $rootScope) {
            var self = this;

            console.log($rootScope.userPosition.position.coords.latitude);
          
            $scope.limit = 10;
            $scope.offset = 0;
          
            ParisApiService.executeRequestHolder().then(function(response) {
                self.results = response.data;
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
                        $scope.$broadcast('scroll.infiniteScrollComplete');    
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


        }
    ]);