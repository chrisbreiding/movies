module Api
  class MoviesController < ApplicationController

    def index
      # render json: Movie.limit(50)
      if params[:genre_id]
        render json: Genre.where(slug: params[:genre_id]).first.movies
        # respond_with Genre.where(slug: params[:genre_id]).first.movies
      else
        render json: Movie.order("title")
        # respond_with Movie.order("title").to_json(include: :genres)
      end
    end

    def show
      render json: Movie.find(params[:id])
      # respond_with Movie.includes(:genres).find(params[:id])
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
end
