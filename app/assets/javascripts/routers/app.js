App.Routers.App = Backbone.Router.extend({

	initialize : function () {
		new App.Views.App();
		Backbone.history.start({ pushState: true });
	},

	routes : {
		'genre/:genre_id' : 'genre'
	},

	genre : function (genre_id) {
		App.Views.movieList.filterByGenre(genre_id);
	}

});
