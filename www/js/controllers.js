angular.module('parisEasy.controllers', [])


.controller('HomeCtrl', ['$scope','$cordovaGeolocation', '$ionicPlatform','ParisApi', '$state',
	function($scope, $cordovaGeolocation, $ionicPlatform, ParisApi, $state) {
   
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

.controller('ResultsCtrl', ['$scope','$cordovaGeolocation', '$ionicPlatform','ParisApi', '$stateParams',
	function($scope, $cordovaGeolocation, $ionicPlatform, ParisApi, $stateParams) {

		var self = this;
		$scope.cat_id = $stateParams.cat_id;

		ParisApi.getActivities($scope.cat_id).then(function (response) {
            console.log(response);
            self.results = response.data;
        });
		
		

}])

.controller('RootCtrl', ['$scope', '$ionicSideMenuDelegate',
	function($scope, $ionicSideMenuDelegate ) {
		$scope.toggleLeft = function() {
            console.info('toggle menu');
            console.log($ionicSideMenuDelegate);
            $ionicSideMenuDelegate.toggleLeft();
        };

}]);
