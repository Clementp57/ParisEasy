angular.module('parisEasy.controllers')
    .controller('SearchEquipmentsResultsCtrl', ['$scope', 'ParisApiService', '$stateParams', '$state',
        function($scope, ParisApiService, $stateParams, $state) {
            var self = this;
          
            ParisApiService.executeRequestHolder().then(function(response) {
                self.results = response.data;
            });


        }
    ]);