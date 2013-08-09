module Api
  class GenresController < ApplicationController

    def index
      if params[:movie_id]
        render json: Movie.find(params[:movie_id]).genres
      else
        render json: Genre.all
      end
    end

    def show
      render json: Genre.find(params[:id])
    end

  end
end
