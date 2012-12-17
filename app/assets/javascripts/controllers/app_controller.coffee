AppCtrl = moviesApp.controller 'AppCtrl', ($scope, $filter, $location, Movie, Genre, params) ->

  $scope.movies = Movie.query ->
    $scope.setFeaturedMovie $scope.getRandomMovie()

  $scope.genres = Genre.query()

  $scope.selectedGenre = params[1] if params

  $scope.selectGenre = ->
    genre = $scope.selectedGenre
    if genre?
      $location.path "/genre/#{genre}"
    else
      $location.path '/' if $location.path() isnt '/'

  $scope.genreForms =
    0: ''
    one: 'Genre'
    other: 'Genres'

  $scope.setFeaturedMovie = (movie) ->
    $scope.featuredMovie = movie
    movie.getAssociations()

  $scope.isFeatured = (movie) ->
    movie is $scope.featuredMovie

  $scope.getRandomMovie = ->
    $scope.movies[ _.random(0, $scope.movies.length - 1) ]

AppCtrl.$inject = [
  '$scope'
  '$filter'
  '$location'
  'Movie'
  'Genre'
  'params'
]
