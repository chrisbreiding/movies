App.Collections.Genres = Backbone.Collection.extend({
	model : App.Models.Genre,
	url : '/genres.json'
});

App.Collections.genres = new App.Collections.Genres();

