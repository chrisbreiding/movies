Movies.MovieRoute = Ember.Route.extend
  setupController: (controller, model)->
    controller.set 'model', model
    controller.set 'allGenres', @controllerFor('genres').get('model')
