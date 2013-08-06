Movies.MovieController = Ember.ObjectController.extend

  genresInflected: (->
    if @get('genres.length') is 1
      'Genre'
    else
      'Genres'
  ).property 'genres'
