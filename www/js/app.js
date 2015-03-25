angular.module('parisEasy', ['ionic', 'parisEasy.controllers', 'parisEasy.services', 'ngCordova', 'ngSanitize'])

.run(function($ionicPlatform, $rootScope, $state, $ionicLoading, $sce) {
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

    $rootScope.trustAsHtml = $sce.trustAsHtml;
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
    
    .state('main.searchActivity', {
        url: '/searchActivity',
        views: {
            'menuContent': {
                templateUrl: 'templates/searchActivity.html',
                controller: 'SearchActivityCtrl as ctrl'
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
    
     .state('main.equipments', {
        url: '/equipments',
        views: {
            'menuContent': {
                templateUrl: 'templates/equipments.html',
                controller: 'EquipmentsCtrl as ctrl'
            }
        }
    })

    .state('main.activityResults', {
        url: '/results/:cat_id',
        views: {
            'menuContent': {
                templateUrl: 'templates/activityResults.html',
                controller: 'ActivityResultsCtrl as ctrl'
            }
        }
    })

    .state('main.activityResult', {
        url: '/activity/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/activityResult.html',
                controller: 'ActivityResultCtrl as ctrl'
            }
        }
    })
    
     .state('main.equipmentResult', {
        url: '/equipment/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/equipmentResult.html',
                controller: 'EquipmentResultCtrl as ctrl'
            }
        }
    })
    
    .state('main.searchActivitiesResults', {
        url: '/searchActivitiesResults',
        views: {
            'menuContent': {
                templateUrl: 'templates/searchActivitiesResults.html',
                controller: 'SearchActivitiesResultsCtrl as ctrl'
            }
        }
    })
    
    .state('main.searchEquipmentsResults', {
        url: '/searchEquipmentsResults',
        views: {
            'menuContent': {
                templateUrl: 'templates/searchEquipmentsResults.html',
                controller: 'SearchEquipmentsResultsCtrl as ctrl'
            }
        }
    })
    
    .state('main.camera', {
        url: '/camera',
        views: {
            'menuContent': {
                templateUrl: 'templates/camera.html',
                controller: 'CameraCtrl as ctrl'
            }
        }
    });

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
    });

    $httpProvider.interceptors.push(function($q, $injector) {
        return {
            'responseError': function(rejection) {
                // do something on error
                $injector.get("$ionicLoading").show({
                    template: "Error ... Please retry later.",
                    duration : 2000
                });
                return $q.reject(rejection);
            }
        }
    });
});

angular.module('parisEasy.controllers', []);
angular.module('parisEasy.services', []);