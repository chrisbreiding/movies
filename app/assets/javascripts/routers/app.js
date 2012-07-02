App.Routers.App = Backbone.Router.extend({

	initialize : function () {
		new App.Views.App();
	},

	routes : {
		'genre/:genre_slug' : 'genre'
	},

	genre : function (genre_slug) {
		App.dispatcher.on('genres_loaded', function () {
			var genre = App.Collections.genres.filter(function (model) {
				return model.get('slug') === genre_slug;
			})[0];
			genre.collection.views[genre.id].setActive();
		});

		App.Collections.movies.filterByGenre(genre_slug);
	}

});