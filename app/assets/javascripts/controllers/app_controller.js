moviesApp.controller('AppCtrl', function ($scope, $filter, $routeParams, $location, _, Movie, GenreMovie, Genre) {

    if ( $routeParams.genreSlug ) {
        $scope.movies = GenreMovie.query({ genreSlug : $routeParams.genreSlug }, function () {
            $scope.setFeaturedMovie($scope.getRandomMovie());
        });
    } else {
        $scope.movies = Movie.query(function () {
            $scope.setFeaturedMovie($scope.getRandomMovie());
        });
    }

    $scope.filteredMovies = [];

    $scope.$watch('search', function(newVal, oldVal) {
        $scope.filteredMovies = $filter('filter')($scope.movies, $scope.search);
    });

    $scope.genres = Genre.query();

    $scope.$watch('selectedGenre', function(genre) {
        if (genre === null) {
            $location.path('/');
        } else if (genre) {
            $location.path('/genre/' + genre.slug);
        }
    });

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