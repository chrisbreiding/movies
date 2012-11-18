moviesApp.controller('AppCtrl', function ($scope, $filter, _, Movie, Genre) {

    $scope.movies = Movie.query(function () {
        $scope.setFeaturedMovie($scope.getRandomMovie());
    });

    $scope.filteredMovies = [];

    $scope.$watch('query', function(newVal, oldVal) {
        $scope.filteredMovies = $filter('filter')($scope.movies, $scope.query);
    });

    $scope.genres = Genre.query();

    $scope.genreForms = {
        0 : '',
        one : 'Genre',
        other : 'Genres'
    };

    $scope.setFeaturedMovie = function (movie) {
        $scope.featuredMovie = movie;
        movie.getAssociations();
    };

    $scope.isFeatured = function (movie) {
        return movie === $scope.featuredMovie;
    };

    $scope.getRandomMovie = function () {
        return $scope.movies[_.random(0, $scope.movies.length - 1)];
    };

}).$inject = (['$scope', 'Movie']);