class GenresController < ApplicationController
	respond_to :json

	def index
		@genres = Genre.all
		respond_with @genres
	end
end
