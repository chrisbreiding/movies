AppCtrl = moviesApp.controller 'AppCtrl', ($scope, $filter, $routeParams, $location, Movie, GenreMovie, Genre) ->

  if $routeParams.genreSlug
    $scope.movies = GenreMovie.query { genreSlug: $routeParams.genreSlug }, ->
      $scope.setFeaturedMovie $scope.getRandomMovie()
  else
    $scope.movies = Movie.query ->
      $scope.setFeaturedMovie $scope.getRandomMovie()

  $scope.filteredMovies = []

  $scope.$watch 'search', (newVal, oldVal) ->
    $scope.filteredMovies = $filter('filter')($scope.movies, $scope.search)

  $scope.genres = Genre.query()

  $scope.$watch 'selectedGenre', (genre) ->
    if !genre?
      $location.path '/'
    else if genre
      $location.path "/genre/#{genre.slug}"

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

# AppCtrl.$inject = [
#   '$scope'
#   '$filter'
#   '$routeParams'
#   '$location'
#   'Movie'
#   'GenreMovie'
#   'Genre'
# ]
