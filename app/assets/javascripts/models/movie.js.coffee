Movies.Movie = DS.Model.extend
  title: DS.attr 'string'
  description: DS.attr 'string'

Movies.Movie.FIXTURES = [
    id: 1
    title: 'Roadhouse'
    description: 'Patrick Swayze does round house kicks.'
  ,
    id: 2
    title: 'American Beauty'
    description: 'Kevin Spade quits his job, smokes weed, and gets ripped.'
  ,
    id: 3
    title: 'Despicable Me'
    description: 'Steve Carell turns into a cartoon and has little yellow minions.'
  ]
