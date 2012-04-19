class MoviesController < ApplicationController
	respond_to :json

	def index
		if params[:genre_id]
			@movies = Genre.find(params[:genre_id]).movies
			respond_with @movies
		end
	end

end
