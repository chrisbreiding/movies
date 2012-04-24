App.Collections.Genres = Backbone.Collection.extend({

	model : App.Models.Genre,

	url : '/genres.json',

	initialize : function () {
		this.bind('add',   this.addOne, this);
		this.bind('reset', this.addAll, this);

		this.views = {};

		this.fetch();
	},

	addOne : function (genre) {
		var view = new App.Views.Genre({
			model : genre
		});
		genre.collection.views[genre.id] = view;
	},

	addAll : function () {
		this.each(this.addOne);
		App.dispatcher.trigger('genres_loaded');
	}

});

App.Collections.genres = new App.Collections.Genres();

