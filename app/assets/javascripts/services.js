angular.module('utilServices', [])

.factory('_', function () {
    return _;
});

angular.module('movieServices', ['ngResource'])

.factory('RottenTomatoes', function ($http) {
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
})

.factory('Genre', function ($resource) {
    return $resource('/genres/:id');
})

.factory('Movie', function ($resource, RottenTomatoes) {
    var Movie = $resource('/movies/:id');

    Movie.prototype.getRTData = function (rtId) {
        var self = this;

        RottenTomatoes.getData(rtId).then(function (rtData) {
            _.extend(self, rtData);
        });
    };

    Movie.prototype.getAssociations = function () {
        this.critics_rating || this.getRTData(this.rt_id);
    };

    return Movie;
});