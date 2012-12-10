movieServices = angular.module 'movieServices', ['ngResource']

movieServices.factory 'RottenTomatoes', ($http) ->
  baseUrl = 'http://api.rottentomatoes.com/api/public/v1.0'
  apiKey = 'hedyxeyu7a5yggpbs7jwvsqw';

  getData: (movieId) ->
    url = "#{baseUrl}/movies/#{movieId}.json?apikey=#{apiKey}&callback=JSON_CALLBACK"

    $http.jsonp(url)
      .then (response) ->
        movie = response.data

        year: movie.year
        runtime: movie.runtime
        cast: movie.abridged_cast
        poster: movie.posters.thumbnail
        mpaa_rating: movie.mpaa_rating
        critics_rating: movie.ratings.critics_score
        link: movie.links.alternate

movieServices.factory 'Genre', ($resource) ->
  $resource '/api/genres/:id'

movieMethods = {}

movieServices.factory 'Movie', ($resource, RottenTomatoes) ->
  movieMethods =
    getRTData: (rtId) ->
      RottenTomatoes.getData(rtId).then (rtData) =>
        _.extend @, rtData

    getAssociations: ->
      @critics_rating or @getRTData @rt_id

  Movie = $resource '/api/movies'

  _.extend Movie.prototype, movieMethods

  Movie

movieServices.factory 'GenreMovie', ($resource) ->
  GenreMovie = $resource '/api/genres/:genreSlug/movies'

  _.extend GenreMovie.prototype, movieMethods

  GenreMovie;
