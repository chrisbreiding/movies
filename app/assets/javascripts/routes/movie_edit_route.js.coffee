Movies.MovieEditRoute = Ember.Route.extend

  setupController: (controller)->
    @_super controller
    controller.set 'model', @modelFor('movie')
    controller.set 'allGenres', @controllerFor('genres').get('model')

  deactivate: ->
    model = @modelFor 'movie'
    model.get('transaction').rollback() unless model.get 'isSaving'
