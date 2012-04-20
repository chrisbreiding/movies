App.Collections.Movies = Backbone.Collection.extend({
	model : App.Models.Movie
});

App.Collections.movies = new App.Collections.Movies();