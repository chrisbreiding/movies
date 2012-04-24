App.Collections.Genres = Backbone.Collection.extend({

	model : App.Models.Genre,

	url : '/genres.json',

	initialize : function () {
		this.on('add',   this.addOne, this);
		this.on('reset', this.addAll, this);

		this.fetch();
	},

	addOne : function (genre) {
		var view = new App.Views.Genre({
			model : genre
		});

		$('#genre-list').append( view.render().el );
	},

	addAll : function () {
		this.each(this.addOne);
	}

});

App.Collections.genres = new App.Collections.Genres();

