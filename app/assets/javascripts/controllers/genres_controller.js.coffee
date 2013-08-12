Movies.GenresController = Ember.ArrayController.extend

  sortProperties: ['name']

  init: ->
    @_super()
    @set 'model', Movies.Genre.find()
