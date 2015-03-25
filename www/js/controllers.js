angular.module('parisEasy.controllers', [])

.controller('CategoriesCtrl', ['$scope', 'ParisApi',
    function($scope, ParisApi) {
        var self = this;

        ParisApi.getCategories().then(function(response) {
            self.categories = response.data;
        });

    }
])

.controller('MainCtrl', ['$scope', '$ionicSideMenuDelegate',
    function($scope, $ionicSideMenuDelegate) {
        $scope.toggleMenu = function() {
            $scope.sideMenuController.toggleLeft();
        }
    }
]);