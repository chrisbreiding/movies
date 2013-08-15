rt = Movies.rottenTomatoes

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
    rt.getMovieLinkById @get('rt_id')
  ).property 'rt_id'

  searchRT: ->
    console.log "Search RT for: #{@get('rtSearchQuery')}"

    rt.search(@get('rtSearchQuery')).done (movies)->
      console.log movies
