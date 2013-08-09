Movies.Movie = DS.Model.extend
  title: DS.attr 'string'
  chris: DS.attr 'boolean'
  sarah: DS.attr 'boolean'
  shortlist: DS.attr 'boolean'
  rt_id: DS.attr 'string'
  genres: DS.hasMany 'Movies.Genre'
