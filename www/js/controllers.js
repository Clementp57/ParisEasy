angular.module('parisEasy.controllers', [])


.controller('HomeCtrl', ['$scope', '$cordovaGeolocation', '$ionicPlatform', 'ParisApi', '$state',
 function ($scope, $cordovaGeolocation, $ionicPlatform, ParisApi, $state) {
        var self = this;

        self.getLocation = function () {

            console.info('Getting location...');

            $ionicPlatform.ready(function () {
                var posOptions = {
                    timeout: 10000,
                    enableHighAccuracy: false
                };
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        var lat = position.coords.latitude;
                        var long = position.coords.longitude;
                        console.info(lat + " " + long);
                    }, function (err) {
                        console.info(err);
                    });
            });
        };

        ParisApi.getCategories().then(function (response) {
            console.log(response.data);
            self.categories = response.data;
        });

}])

.controller('ResultsCtrl', ['$scope', '$cordovaGeolocation', '$ionicPlatform', 'ParisApi', '$stateParams',
 function ($scope, $cordovaGeolocation, $ionicPlatform, ParisApi, $stateParams) {

        var self = this;
        self.results = {};
        $scope.url = "http://filer.paris.fr/";
        $scope.cat_id = $stateParams.cat_id;
        //$scope.content.title = $stateParams.cat_name;

        ParisApi.getActivities($scope.cat_id, '', '', '', '', 0, 10).then(function (response) {
            console.log(response);
            self.results = response.data;

            // Map
            L.mapbox.accessToken = 'pk.eyJ1IjoibXhpbWUiLCJhIjoiNWQ1cDZUcyJ9.SbzQquPm3IbTZluO90hA6A';
            var map = L.mapbox.map('map')
                .setView([48.855584, 2.354613], 11)
                .addLayer(L.mapbox.tileLayer('examples.h186knp8'));

            angular.forEach(self.results, function (value, key) {
                L.marker([self.results[key].lat, self.results[key].lon]).addTo(map);
            });
        });

        // var loadData = function(offset, limit) {

        // }


        //loadData(10);


}])

.controller('MainCtrl', ['$scope', '$ionicSideMenuDelegate',
 function ($scope, $ionicSideMenuDelegate) {
       $scope.toggleMenu = function() {
            $scope.sideMenuController.toggleLeft();
        }
}]);