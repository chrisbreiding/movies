moviesApp.controller('AppCtrl', function ($scope, $http) {

    $http.get('/movies.json').success(function (movies) {
        $scope.movies = movies;
        $scope.featuredMovie = $scope.movies[0];
        $scope.featuredMovie.featured = true;
    });

    $scope.setFeaturedMovie = function (movie) {
        $scope.featuredMovie.featured = null;
        $scope.featuredMovie = movie;
        $scope.featuredMovie.featured = true;
    };

}).$inject = (['$scope', '$http']);