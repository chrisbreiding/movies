class MoviesController < ApplicationController
	respond_to :json

	def index
		if params[:genre_id]
      respond_with Genre.where(slug: params[:genre_id]).first.movies
		end
	end

  def show
    movie = Movie.includes(:genres).find params[:id]
    movie[:genres] = movie.genres
    respond_with movie
  end

  def search
    respond_with Movie.where("title LIKE ?", "%#{params[:query]}%")
  end

end
