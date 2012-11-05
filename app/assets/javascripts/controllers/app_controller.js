moviesApp.controller('AppCtrl', function ($scope, Movie) {

    $scope.movies = Movie.query(function () {
        $scope.featuredMovie = $scope.movies[_.random(0, $scope.movies.length - 1)];
        $scope.featuredMovie.getGenres();
    });

    $scope.genreForms = {
        0: '',
        one: 'Genre',
        other: 'Genres'
    };

    $scope.isFeatured = function (movie) {
        return movie === $scope.featuredMovie;
    };

    $scope.setFeaturedMovie = function (movie) {
        $scope.featuredMovie = movie;
        !movie.genres && movie.getGenres();
    };

}).$inject = (['$scope', 'Movie']);