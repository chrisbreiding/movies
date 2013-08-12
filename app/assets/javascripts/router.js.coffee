Movies.Router.map ->
  @resource 'movies', ->
    @resource 'movie', path: ':movie_id'

Movies.IndexRoute = Ember.Route.extend
  redirect: -> @transitionTo 'movies'

Movies.MoviesRoute = Ember.Route.extend
  model: -> Movies.Movie.find()
