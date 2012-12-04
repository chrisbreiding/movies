moviesApp

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: '/partials/index.html',
            controller: 'AppCtrl'
        }).
        when('/genre/:genreSlug', {
            templateUrl: '/partials/index.html',
            controller: 'AppCtrl'
        }).
        otherwise({redirectTo: '/'});
}])

.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);
}]);