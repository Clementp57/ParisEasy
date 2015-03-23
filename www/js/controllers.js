angular.module('parisEasy.controllers', [])


.controller('HomeCtrl', ['$scope', 'ParisApi', '$cordovaGeolocation', '$ionicPlatform',
    function ($scope, ParisApi, $cordovaGeolocation, $ionicPlatform) {
        
        ParisApi.getCategories().then(function (datas) {
            $scope.categories = datas;
            console.log('Loaded categories -> ', categories);
        });
        
        $scope.getLocation = function () {

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
        }
}]);