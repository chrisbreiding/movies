App.Views.GenreList = Backbone.View.extend({

	el : '#genre-list',

	initialize : function () {
		App.Collections.genres.on('add',   this.addOne, this);
		App.Collections.genres.on('reset', this.addAll, this);
		App.Collections.genres.on('all',   this.render, this);

		App.Collections.genres.fetch();
	},

	events : {
	},

	render : function () {
	},

	addOne : function (genre) {
		var view = new App.Views.Genre({
			model	: genre
		});

		$('#genre-list').append( view.render().el );
	},

	addAll : function () {
		App.Collections.genres.each(this.addOne);
	}

});

App.Views.genreList = new App.Views.GenreList();
