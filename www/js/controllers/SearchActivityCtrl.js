angular.module('parisEasy.controllers')
    .controller('SearchActivityCtrl', ['$scope', '$ionicSideMenuDelegate',
        function($scope, $ionicSideMenuDelegate) {
            $scope.toggleMenu = function() {
                $scope.sideMenuController.toggleLeft();
            }
        }
    ]);