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
		var $movieWrap = $('.movie-wrap');

		$('#movie-list').html('');
		$movieWrap.addClass('loading');

		$.ajax({
			url : '/genres/' + genreSlug + '/movies/',
			success : function(data) {
				$movieWrap.removeClass('loading');
				App.Collections.movies.reset(data);
			}
		});

		App.Routers.app.navigate('genre/' + genreSlug, {replace : true});
	}

});

App.Collections.movies = new App.Collections.Movies();