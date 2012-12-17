# moviesApp.config ['$routeProvider', ($routeProvider) ->
#   $routeProvider
#     .when '/',
#       templateUrl: '/partials/index.html'
#       controller: 'AppCtrl'
#     .when '/genre/:genreSlug',
#       templateUrl: '/partials/index.html'
#       controller: 'AppCtrl'
#     .otherwise redirectTo: '/'
# ]

moviesApp.config ['$locationProvider', ($locationProvider) ->
  $locationProvider.html5Mode true
]
