angular.module('parisEasy.controllers')
    .controller('SearchEquipmentsResultsCtrl', ['$scope', 'ParisApiService', '$stateParams', '$state',
        function($scope, ParisApiService, $stateParams, $state) {
            var self = this;
          
            $scope.limit = 10;
            $scope.offset = 0;
          
            ParisApiService.executeRequestHolder().then(function(response) {
                self.results = response.data;
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