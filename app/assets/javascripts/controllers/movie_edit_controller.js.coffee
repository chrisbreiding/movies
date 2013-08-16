rt = Movies.rottenTomatoes

Movies.MovieEditController = Ember.ObjectController.extend

  searching: false

  noResults: false

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
    @set 'searching', true
    @set 'noResults', false
    query = @get 'rtSearchQuery'

    if query
      rt.search(query).done (movies)=>
        @set 'searching', false
        @set 'searchResults', movies
        @set 'noResults', !movies.length

  previousResult: ->
    console.log 'previous result'

  nextResult: ->
    console.log 'next result'

  save: ->
    # validate
    # commit changes
    @get('target').transitionTo 'movie'

  cancel: ->
    # rollback changes
    @get('target').transitionTo 'movie'
