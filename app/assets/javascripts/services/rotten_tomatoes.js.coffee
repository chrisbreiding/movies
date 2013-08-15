Movies.rottenTomatoes =
  baseUrl: 'http://api.rottentomatoes.com/api/public/v1.0'
  apiKey: 'hedyxeyu7a5yggpbs7jwvsqw'

  getMovieLinkById: (movieId)->
    "http://rottentomatoes.com/m/#{movieId}"

  getInfoByMovieId: (movieId)->
    request = $.ajax
      url: "#{@baseUrl}/movies/#{movieId}.json"
      dataType: 'JSONP'
      data:
        apikey: @apiKey

    request.then (movie)->
      year: movie.year
      runtime: movie.runtime
      actors: movie.abridged_cast
      poster_detailed: movie.posters.poster_detailed
      poster_original: movie.posters.poster_original
      poster_profile: movie.posters.poster_profile
      poster_thumbnail: movie.posters.poster_thumbnail
      mpaa_rating: movie.mpaa_rating
      critics_score: movie.ratings.critics_score
      audience_score: movie.ratings.audience_score

  search: (query)->
    request = $.ajax
      url: "#{@baseUrl}/movies.json"
      dataType: 'JSONP'
      data:
        apikey: @apiKey
        q: query
        page_limit: 15

    request.then (response)->
      movies = response.movies
      movies.map (movie)->
        title: movie.title
        rt_id: movie.id
        year: movie.year
        runtime: movie.runtime
        actors: movie.abridged_cast
        poster_detailed: movie.posters.detailed
        poster_original: movie.posters.original
        poster_profile: movie.posters.profile
        poster_thumbnail: movie.posters.thumbnail
        mpaa_rating: movie.mpaa_rating
        critics_score: movie.ratings.critics_score
        audience_score: movie.ratings.audience_score
