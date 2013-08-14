Movies.MoviesRoute = Ember.Route.extend
  model: -> Movies.Movie.find()
