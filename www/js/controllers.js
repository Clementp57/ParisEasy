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

	self.results = function (id) {
		console.info("Go results");
        $state.go('tab.results', {id: id});
    }

	ParisApi.getCategories().then(function (response) {
            console.log(response.data);
            self.categories = response.data;
        });

}])

.controller('ResultsCtrl', ['$scope','ParisApi', '$stateParams',
	function($scope, ParisApi, $stateParams) {	

		var self = this;
		self.cat_id = 2;

		self.getResults = function(id) {
			ParisApi.getEquipements(id).then(function (response) {
	            console.log(response.data);
	            self.categories = response.data;
	        });
		}

		

}]);
