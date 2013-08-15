Movies.MovieEditRoute = Ember.Route.extend

  setupController: (controller)->
    @_super controller
    controller.set 'model', @modelFor('movie')
    controller.set 'allGenres', @controllerFor('genres').get('model')
