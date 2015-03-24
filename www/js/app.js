angular.module('parisEasy', ['ionic', 'parisEasy.controllers', 'parisEasy.services', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $state, $ionicLoading) {
  
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

    $rootScope.$state = $state;

    $rootScope.$on('loading:show', function() {
        $ionicLoading.show({
            content: '<i class="icon ion-loading-c"></i>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 10
        });
    });

    $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide()
    });

})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
    .state('main', {
        url: '/main',
        templateUrl: 'templates/sidemenu.html',
        abstract: true,
        controller: 'MainCtrl'
    })

    // Home 
    .state('main.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl as ctrl'
            }
        }
    })

    .state('main.categories', {
        url: '/categories',
        views: {
            'menuContent': {
                templateUrl: 'templates/categories.html',
                controller: 'CategoriesCtrl as ctrl'
            }
        }
    })

    .state('main.results', {
        url: '/results/:cat_id',
        views: {
            'menuContent': {
                templateUrl: 'templates/results.html',
                controller: 'ResultsCtrl as ctrl'
            }
        }
    })

    .state('result', {
        url: '/result/:id',
        templateUrl: 'templates/result.html',
        controller: 'ResultCtrl as ctrl'
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('main/home');


})

.config(function($httpProvider) {
    $httpProvider.interceptors.push(function($rootScope) {
        return {
            request: function(config) {
                $rootScope.$broadcast('loading:show')
                return config
            },
            response: function(response) {
                $rootScope.$broadcast('loading:hide')
                return response
            }
        }
    })
});