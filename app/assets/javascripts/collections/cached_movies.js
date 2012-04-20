App.Collections.CachedMovies = Backbone.Collection.extend({
	model : App.Models.CachedMovie
});

App.Collections.cachedMovies = new App.Collections.CachedMovies();