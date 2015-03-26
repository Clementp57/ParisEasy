angular.module('parisEasy')
    .controller('MainCtrl', ['$scope', '$ionicSideMenuDelegate',
        function($scope, $ionicSideMenuDelegate) {
            $scope.toggleMenu = function() {
                $scope.sideMenuController.toggleLeft();
            }
        }
    ]);