angular.module('parisEasy.controllers')
    .controller('SearchActivitiesResultsCtrl', ['$scope', 'ParisApiService', '$stateParams', '$state',
        function($scope, ParisApiService, $stateParams, $state) {
            var self = this;
            $scope.url = "http://filer.paris.fr/";
          
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


        }
    ]);