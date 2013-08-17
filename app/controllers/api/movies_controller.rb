module Api
  class MoviesController < ApplicationController

    def index
      render json: Movie.limit(50).order('title')
      # if params[:genre_id]
      #   respond_with Genre.where(slug: params[:genre_id]).first.movies
      # else
      #   respond_with Movie.order("title").to_json(include: :genres)
      # end
    end

    def show
      render json: Movie.find(params[:id])
    end

    def create
      movie = Movie.new(params[:movie])

      if movie.save
        render json: movie
      else
        render json: movie.errors
      end
    end

    def update
      movie = Movie.find(params[:id])

      if movie.update_attributes(params[:movie])
        render json: movie
      else
        render json: movie.errors
      end
    end

    def search
      render json: Movie.where("title LIKE ?", "%#{params[:query]}%")
    end

  end
end
