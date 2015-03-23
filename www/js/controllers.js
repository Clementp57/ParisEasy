angular.module('parisEasy.controllers', [])

.controller('HomeCtrl', ['$scope','$cordovaGeolocation', '$ionicPlatform','ParisApi', '$state',
	function($scope, $cordovaGeolocation, $ionicPlatform, ParisApi, $state) {

	$scope.getLocation = function(){

		console.info('Getting location...');

		$ionicPlatform.ready(function() {
			var posOptions = {timeout: 10000, enableHighAccuracy: false};
			  $cordovaGeolocation
			    .getCurrentPosition(posOptions)
			    .then(function (position) {
			      var lat  = position.coords.latitude;
			      var long = position.coords.longitude;
			      console.info(lat +" "+ long);
			    }, function(err) {
			      console.info(err);
			  	});
		});
	};

	$scope.results = function (id) {
		console.info("Go results");
        $state.go('tab.results', {id: id});
    }

	ParisApi.getCategories().then(function(datas) {
        console.log(datas); 
    });

}])

.controller('ResultsCtrl', ['$scope','ParisApi',
	function($scope, ParisApi) {
		console.info('Results');
}]);


