Movies.RottenTomatoes =
  baseUrl: 'http://api.rottentomatoes.com/api/public/v1.0'
  apiKey: 'hedyxeyu7a5yggpbs7jwvsqw'

  getInfoByMovieId: (movieId)->
    deferred = $.Deferred()

    $.ajax
      url: "#{@baseUrl}/movies/#{movieId}.json"
      dataType: 'JSONP'
      data:
        apikey: @apiKey
      success: (movie)->
        deferred.resolve
          year: movie.year
          runtime: movie.runtime
          cast: movie.abridged_cast
          poster: movie.posters.profile # detailed / original / profile / thumbnail
          mpaaRating: movie.mpaa_rating
          criticsRating: if movie.ratings.critics_score > 70 then movie.ratings.critics_score else -1
          link: movie.links.alternate

    deferred
