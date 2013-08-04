Movies.RottenTomatoes =
  baseUrl: 'http://api.rottentomatoes.com/api/public/v1.0'
  apiKey: 'hedyxeyu7a5yggpbs7jwvsqw'

  getInfoByMovieId: (movieId)->
    deferred = $.Deferred()

    url = "#{@baseUrl}/movies/#{movieId}.json" # ?apikey =#{this.get('apiKey')}&callback =JSON_CALLBACK"

    $.ajax
      url: url
      dataType: 'JSONP'
      data:
        apikey: @apiKey
      success: (movie)->
        mapped_response =
          year: movie.year
          runtime: movie.runtime
          cast: movie.abridged_cast
          poster: movie.posters.profile # detailed / original / profile / thumbnail
          mpaa_rating: movie.mpaa_rating
          critics_rating: movie.ratings.critics_score
          link: movie.links.alternate

        deferred.resolve mapped_response

    deferred
