angular.module('parisEasy.controllers', [])
.controller('HomeCtrl', ['$scope','ParisApi',function($scope, $cordovaGeolocation, $ionicPlatform, ParisApi) {

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

	ParisApi.getCategories().then(function(datas) {
        console.log(datas); 
    });

}]);
