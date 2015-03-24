angular.module('parisEasy.controllers', [])


.controller('HomeCtrl', ['$scope', '$cordovaGeolocation', '$ionicPlatform', 'ParisApi', '$state', '$rootScope',
   function ($scope, $cordovaGeolocation, $ionicPlatform, ParisApi, $state, $rootScope) {
        var self = this;
        self.currentLocation = "";

        self.getLocation = function () {
          $rootScope.$broadcast('loading:show')
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

                  var geocoder = new google.maps.Geocoder();
                  var latlng = new google.maps.LatLng(lat, long);
                  geocoder.geocode({
                      'latLng': latlng
                    },
                    function (results, status) {
                      if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                          self.currentLocation = results[1].formatted_address;
                          $scope.$apply();

                        } else {
                          //GERER LE CAS DE LA POSITION NON TROUVEE
                        }
                      } else {
                        //GEOCODER FAILED
                      }
                    },
                    function (err) {
                      console.info(err);
                    });
                $rootScope.$broadcast('loading:hide');
                });
            });
         }
        
        ParisApi.getCategories().then(function(response) {
          self.categories = response.data;
        });
                



          }])

.controller('ResultsCtrl', ['$scope', '$cordovaGeolocation', '$ionicPlatform', 'ParisApi', '$stateParams',
function ($scope, $cordovaGeolocation, $ionicPlatform, ParisApi, $stateParams) {
          var self = this;
          $scope.limit = 10;
          $scope.offset = 0;
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

          $scope.loadData = function () {

            $scope.limit += 10;
            $scope.offset += 10

        	ParisApi.getActivities($scope.cat_id, '', '', '', '', $scope.offset, $scope.limit).then(function (response) {
	            
        		angular.forEach(self.results, function(value, key) {
        			 self.results.push(response.data[key]);
        		});

	           	$scope.$broadcast('scroll.infiniteScrollComplete');
	            console.log(self.results);
            });
            
        };

}])

.controller('ResultCtrl', ['$scope','ParisApi', '$stateParams', '$interval', 'instagram',
	function($scope, ParisApi, $stateParams, $interval, instagram) {

		$scope.result = null;
		$scope.url = "http://filer.paris.fr/";
		$scope.id = $stateParams.id;
		console.log($scope.id);

		ParisApi.getActivity($scope.id).then(function (response) {

			 $scope.result = response.data[0];
	            
			// Map
            L.mapbox.accessToken = 'pk.eyJ1IjoibXhpbWUiLCJhIjoiNWQ1cDZUcyJ9.SbzQquPm3IbTZluO90hA6A';
			var map_solo = L.mapbox.map('map_solo')
			    .setView([$scope.result.lat, $scope.result.lon], 15)
			    .addLayer(L.mapbox.tileLayer('examples.h186knp8'));


			  L.marker([$scope.result.lat, $scope.result.lon]).addTo(map_solo);
	          console.log($scope.result);

	          $scope.locations = [];
			  instagram.getLocation($scope.result.lat,$scope.result.lon,function(data) {
		    	console.log(data);
		        for(var i=0; i<data.length; i++) {	          
		            $scope.locations.push(data[i]) ;
		        }

		        var id_location = $scope.locations[0].id;

				  $scope.pics = [];
				    instagram.getImages(id_location, function(data) {
				    	console.log(data);
				        for(var i=0; i<data.length; i++) {	          
				            $scope.pics.push(data[i]) ;
				        }
				    });

				    console.log($scope.pics)
			  });

			  

            });

}])


.controller('MainCtrl', ['$scope', '$ionicSideMenuDelegate',
function ($scope, $ionicSideMenuDelegate) {
          $scope.toggleMenu = function () {
            $scope.sideMenuController.toggleLeft();
          }
}]);
