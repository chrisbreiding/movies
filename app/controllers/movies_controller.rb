class MoviesController < ApplicationController
	respond_to :json

	def index
		if params[:genre_id]
      respond_with Genre.where(slug: params[:genre_id]).first.movies
    else
      respond_with Movie.all
		end
	end

  def show
    respond_with Movie.find(params[:id]).includes(:genres)
  end

  def create
    movie = Movie.new(params[:movie])

    if movie.save
      respond_with movie
    else
      respond_with movie.errors
    end
  end

  def update
    movie = Movie.find(params[:id])

    if movie.update_attributes(params[:movie])
      respond_with movie
    else
      respond_with movie.errors
    end
  end

  def search
    respond_with Movie.where("title LIKE ?", "%#{params[:query]}%")
  end

end
