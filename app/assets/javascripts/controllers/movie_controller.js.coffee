Movies.MovieController = Ember.ObjectController.extend

  genresInflected: (->
    if @get('genres.length') is 1
      'Genre'
    else
      'Genres'
  ).property 'genres'

  link: (->
    Movies.rottenTomatoes.getMovieLinkById @get('rt_id')
  ).property 'rt_id'

  edit: ->
    @get('target').transitionTo 'movie.edit'
