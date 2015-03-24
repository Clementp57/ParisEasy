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
		$scope.limit=10;
		$scope.offset=0;
		$scope.url = "http://filer.paris.fr/";
		self.results = new Array();
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

        $scope.loadData = function() {

        	$scope.limit+=10;
        	$scope.offset+=10

        	console.log("loading data" +  " " +  $scope.offset + " -> " + $scope.limit);

        	ParisApi.getActivities($scope.cat_id, '', '', '', '', $scope.offset, $scope.limit).then(function (response) {
	            
        		angular.forEach(self.results, function(value, key) {
        			 self.results.push(response.data[key]);
        		});
        		
	           	$scope.$broadcast('scroll.infiniteScrollComplete');
	            console.log(self.results);
            });
            
        };
}])

.controller('MainCtrl', ['$scope', '$ionicSideMenuDelegate',
 function ($scope, $ionicSideMenuDelegate) {
       $scope.toggleMenu = function() {
            $scope.sideMenuController.toggleLeft();
        }
}]);
