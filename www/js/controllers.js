angular.module('parisEasy.controllers', [])
    .controller('HomeCtrl', ['$scope', '$cordovaGeolocation', '$ionicPlatform', 'ParisApi',
 function ($scope, $cordovaGeolocation, $ionicPlatform, ParisApi) {
     
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

}]);