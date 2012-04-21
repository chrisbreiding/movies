App.Routers.App = Backbone.Router.extend({

	initialize : function () {
		new App.Views.App();
	},

	routes : {
		'genre/:genre' : 'genre'
	},

	genre : function (genre) {
		App.Views.movieList.filterByGenre(genre);
	}

});
