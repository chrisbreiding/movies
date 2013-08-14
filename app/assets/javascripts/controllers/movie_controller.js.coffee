Movies.MovieController = Ember.ObjectController.extend

  isEditing: false

  edit: ->
    @set 'isEditing', true

  doneEditing: ->
    @set 'isEditing', false

  genresInflected: (->
    if @get('genres.length') is 1
      'Genre'
    else
      'Genres'
  ).property 'genres'

  link: (->
    "http://rottentomatoes.com/m/#{@get('rt_id')}"
  ).property 'rt_id'

  searchRT: ->
    console.log @get('rtSearch')
