Movies.Genre = DS.Model.extend
  name: DS.attr 'string'
  slug: DS.attr 'string'
  movies: DS.hasMany 'Movies.Movie'
