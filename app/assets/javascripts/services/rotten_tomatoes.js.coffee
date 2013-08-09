Movies.RottenTomatoes =
  baseUrl: 'http://api.rottentomatoes.com/api/public/v1.0'
  apiKey: 'hedyxeyu7a5yggpbs7jwvsqw'

  getInfoByMovieId: (movieId)->
    request = $.ajax
      url: "#{@baseUrl}/movies/#{movieId}.json"
      dataType: 'JSONP'
      data:
        apikey: @apiKey

    request.then (movie)->
      year: movie.year
      runtime: movie.runtime
      cast: movie.abridged_cast
      poster: movie.posters.profile # detailed / original / profile / thumbnail
      mpaaRating: movie.mpaa_rating
      criticsRating: movie.ratings.critics_score
      link: movie.links.alternate
