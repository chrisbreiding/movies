angular.module('movieServices', ['ngResource'])

.factory('MovieGenre', function ($resource) {
    return $resource('/movies/:movieId/genres.json');
})

.factory('Movie', function ($resource, MovieGenre) {
    var Movie = $resource('/movies/:id.json');

    Movie.prototype.getGenres = function () {
        var self = this;

        MovieGenre.query({ movieId : this.id }, function (genres) {
            self.genres = genres;
        });
    };

    return Movie;
});