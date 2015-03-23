angular.module('parisEasy.controllers', [])

.controller('HomeCtrl',['$scope','ParisApi', function($scope, ParisApi) {
    ParisApi.getCategories().then(function(datas) {
        console.log(datas); 
    });
}]);
