moviesApp.controller('AppCtrl', function ($scope, Movie) {

    $scope.movies = Movie.query(function () {
        $scope.setFeaturedMovie($scope.getRandomMovie());
    });

    $scope.genreForms = {
        0 : '',
        one : 'Genre',
        other : 'Genres'
    };

    $scope.setFeaturedMovie = function (movie) {
        $scope.featuredMovie = movie;
        movie.genres || movie.getGenres();
    };

    $scope.isFeatured = function (movie) {
        return movie === $scope.featuredMovie;
    };

    $scope.getRandomMovie = function () {
        return $scope.movies[_.random(0, $scope.movies.length - 1)];
    };

}).$inject = (['$scope', 'Movie']);