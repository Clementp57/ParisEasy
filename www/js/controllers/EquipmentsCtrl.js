angular.module('parisEasy.controllers')
    .controller('EquipmentsCtrl', ['$scope', 'ParisApiService', '$state',
        function($scope, ParisApiService, $state) {
            var self = this;
            self.category = 0;
            var map = null;

            // Map
            L.mapbox.accessToken = 'pk.eyJ1IjoibXhpbWUiLCJhIjoiNWQ1cDZUcyJ9.SbzQquPm3IbTZluO90hA6A';
            if (map == null) {
                map = L.mapbox.map('mapEquipments');
            }
          
            ParisApiService.getCategories().then(function(response) {
                self.categories = response.data;
                self.reloadEquipments();

                map.setView([48.855584, 2.354613], 11)
                    .addLayer(L.mapbox.tileLayer('examples.h186knp8'));

            }, function(error) {
                $state.go('main.home');
            });

            self.reloadEquipments = function() {
                ParisApiService.getEquipments(self.category, 0, 100).then(function(response) {
                    console.log(response);
                    self.equipments = response.data;
                    angular.forEach(self.equipments, function(value, key) {
                        L.marker([self.equipments[key].lat, self.equipments[key].lon]).addTo(map);
                    });

                });
            }
        }
    ]);