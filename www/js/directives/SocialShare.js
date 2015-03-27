angular.module('parisEasy.services')
    .directive('SocialShare', function() {
        return {
            restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                title: '@',
                description: '@',
                imageUrl: '@'
            },
            template: '<button class="button button-block button-light" ng-click="share();">' +
                '<i class="ion-share" style="font-size:200%"></i>' +
                '</button>',
            controller: function() {
               
            }, 
            link: function($scope, element, attrs) {

            } //DOM manipulation
        }
    });