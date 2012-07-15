App.Collections.Movies = Backbone.Collection.extend({

	model : App.Models.Movie,

    url : '/movies',

	initialize : function () {
		this.on('add',   this.addOne, this);
		this.on('reset', this.addAll, this);
		// this.on('all',   this.render, this);
	},

    comparator : function (movie) {
        return movie.get('title');
    },

	addOne : function (movie) {
		new App.Views.Movie({ model : movie });
	},

	addAll : function () {
		this.each(this.addOne);
	},

	filterByGenre : function (genreSlug) {
        var moviesFetched = $.get('/genres/' + genreSlug + '/movies/');

        App.dispatcher.trigger('moviesLoading');

        moviesFetched.done($.proxy(function (movies) {
            App.dispatcher.trigger('moviesLoaded');
            this.reset(movies);
        }, this));

		App.Routers.app.navigate('genre/' + genreSlug, {replace : true});
	}

});

App.Collections.movies = new App.Collections.Movies();