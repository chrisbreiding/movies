var utilServices = angular.module('utilServices', []);

utilServices.factory('_', function () {
    return _;
});

var movieServices = angular.module('movieServices', ['ngResource']);

movieServices.factory('RottenTomatoes', function ($http) {
    var baseUrl = 'http://api.rottentomatoes.com/api/public/v1.0',
        apiKey = 'hedyxeyu7a5yggpbs7jwvsqw';

    return {
        getData : function (movieId) {
            var url = baseUrl + '/movies/' + movieId + '.json?apikey=' + apiKey + '&callback=JSON_CALLBACK';

            return $http.jsonp(url)
                .then(function (response) {
                    var movie = response.data;

                    return {
                        year : movie.year,
                        runtime : movie.runtime,
                        cast : movie.abridged_cast,
                        poster : movie.posters.thumbnail,
                        mpaa_rating : movie.mpaa_rating,
                        critics_rating : movie.ratings.critics_score,
                        link : movie.links.alternate
                    };
                });
        }
    };
});

movieServices.factory('Genre', function ($resource) {
    return $resource('/api/genres/:id');
});

var movieMethods = {};

movieServices.factory('Movie', function ($resource, _, RottenTomatoes) {
    movieMethods = {
        getRTData : function (rtId) {
            var self = this;

            RottenTomatoes.getData(rtId).then(function (rtData) {
                _.extend(self, rtData);
            });
        },

        getAssociations : function () {
            this.critics_rating || this.getRTData(this.rt_id);
        }
    };

    var Movie = $resource('/api/movies');
    _.extend(Movie.prototype, movieMethods);
    return Movie;
});

movieServices.factory('GenreMovie', function ($resource, _) {
    var GenreMovie = $resource('/api/genres/:genreSlug/movies');
    _.extend(GenreMovie.prototype, movieMethods);
    return GenreMovie;
});