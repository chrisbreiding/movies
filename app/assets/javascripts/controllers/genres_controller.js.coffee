Movies.GenresController = Ember.ArrayController.extend

  init: ->
    @_super()
    @set 'model', Movies.Genre.find()
