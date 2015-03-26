angular.module('parisEasy.controllers')
    .controller('CategoriesCtrl', ['$scope', 'ParisApiService',
        function($scope, ParisApiService) {
            var self = this;

            ParisApiService.getCategories().then(function(response) {
                self.categories = response.data;
            });

        }
    ]);