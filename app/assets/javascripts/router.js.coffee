Movies.Router.map ->
  @resource 'genres', ->
    @resource 'genre', path: ':genre_id', ->
      @resource 'movies', ->
        @resource 'movie', path: ':movie_id'

Movies.IndexRoute = Ember.Route.extend
  redirect: -> @transitionTo 'genres/1/movies'

Movies.MoviesRoute = Ember.Route.extend
  model: -> Movies.Movie.find()

Movies.MovieRoute = Ember.Route.extend
  setupController: (controller, movie)->
    controller.set 'model', movie

    infoRequest = Movies.RottenTomatoes.getInfoByMovieId movie.get('rt_id')
    infoRequest.done (details)->
      for detail_name, detail of details
        controller.set detail_name, detail
