angular.module('parisEasy')
    .controller('CategoriesCtrl', ['$scope', 'ParisApi',
        function($scope, ParisApi) {
            var self = this;

            ParisApi.getCategories().then(function(response) {
                self.categories = response.data;
            });

        }
    ]);