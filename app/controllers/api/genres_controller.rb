module Api
  class GenresController < ApplicationController
  	respond_to :json

  	def index
      if params[:movie_id]
        respond_with Movie.find(params[:movie_id]).genres
      else
    		respond_with Genre.all
      end
  	end

  end
end
