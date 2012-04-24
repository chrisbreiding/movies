App.Collections.Movies = Backbone.Collection.extend({

	model : App.Models.Movie,

	initialize : function () {
		this.on('add',   this.addOne, this);
		this.on('reset', this.addAll, this);
		// this.on('all',   this.render, this);
	},

	addOne : function (movie) {
		new App.Views.Movie({ model : movie });
	},

	addAll : function () {
		this.each(this.addOne);
	},

	filterByGenre : function (genre) {
		var cachedMoviesModel = App.Collections.cachedMovies.get(genre),
			$movieWrap = $('.movie-wrap');

		$('#movie-list').html('');

		if ( !!cachedMoviesModel ) {

			App.Collections.movies.reset( cachedMoviesModel.get('movies') );

		} else {

			$movieWrap.addClass('loading');

			$.ajax({
				url : '/genres/' + genre + '/movies/',
				success : function(data) {
					$movieWrap.removeClass('loading');

					App.Collections.movies.reset(data);

					App.Collections.cachedMovies.add({
						id : genre,
						movies : data
					});
				}
			});

		}

		App.Routers.app.navigate('genre/' + genre, {replace : true});
	}

});

App.Collections.movies = new App.Collections.Movies();