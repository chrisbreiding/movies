Movies.Router.map ->
  @resource 'movies', ->
    @resource 'movie', path: ':movie_id', ->
      @route 'edit', path: 'edit'
