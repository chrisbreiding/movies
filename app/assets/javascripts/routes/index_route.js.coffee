Movies.IndexRoute = Ember.Route.extend
  redirect: -> @transitionTo 'movies'
