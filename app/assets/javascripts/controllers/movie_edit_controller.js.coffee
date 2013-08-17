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

  movieSelected: (movie)->
    @set 'rt_id', movie.rt_id
    @set 'year', movie.year
    @set 'runtime', movie.runtime
    @get('actors').setObjects []
    movie.actors.forEach (actor)=>
      @get('actors').pushObject Movies.Actor.createRecord(actor)
    @set 'poster_detailed', movie.poster_detailed
    @set 'poster_original', movie.poster_original
    @set 'poster_profile', movie.poster_profile
    @set 'poster_thumbnail', movie.poster_thumbnail
    @set 'mpaa_rating', movie.mpaa_rating
    @set 'critics_score', movie.critics_score
    @set 'audience_score', movie.audience_score

  save: ->
    # need validations
    @get('model').get('store').commit()
    @get('target').transitionTo 'movie'

  cancel: ->
    @get('target').transitionTo 'movie'
