rt = Movies.rottenTomatoes

Movies.MovieEditController = Ember.ObjectController.extend

  genresInflected: (->
    if @get('genres.length') is 1
      'Genre'
    else
      'Genres'
  ).property 'genres.length'

  link: (->
    rt.getMovieLinkById @get('rt_id')
  ).property 'rt_id'

  searchRT: ->
    console.log "Search RT for: #{@get('rtSearchQuery')}"

    rt.search(@get('rtSearchQuery')).done (movies)->
      console.log movies

  save: ->
    # validate
    # commit changes
    @get('target').transitionTo 'movie'

  cancel: ->
    # rollback changes
    @get('target').transitionTo 'movie'
