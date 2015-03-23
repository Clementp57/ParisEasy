angular.module('parisEasy.controllers', [])

.controller('HomeCtrl', function($scope, $cordovaGeolocation, $ionicPlatform) {

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
	}

});

// .controller('ChatsCtrl', function($scope, Chats) {
//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   }
// })

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableFriends: true
//   };
// });
