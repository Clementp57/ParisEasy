angular.module('parisEasy.controllers')
    .controller('CategoriesCtrl', ['$scope', 'ParisApiService', '$state',
        function($scope, ParisApiService, $state) {
            var self = this;

            ParisApiService.getCategories().then(function(response) {
                self.categories = response.data;
            }, function(error) {
                setTimeout(function() {
                    $state.go('main.home');
                }, 1500);
            });

        }
    ]);