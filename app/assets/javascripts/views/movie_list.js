App.Views.MovieList = Backbone.View.extend({

	el : '#movie-list',

	initialize : function () {
		App.Collections.movies.on('add',   this.addOne, this);
		App.Collections.movies.on('reset', this.addAll, this);
		//App.Collections.movies.on('all',   this.render, this);
	},

	events : {
	},

	render : function () {
	},

	addOne : function (movie) {
		var view = new App.Views.Movie({
			model	: movie
		});

		$('#movie-list').append( view.render().el );
	},

	addAll : function () {
		App.Collections.movies.each(this.addOne);
	},

	filterByGenre : function (genre) {
		var cachedMoviesModel =  App.Collections.cachedMovies.get(genre),
			$movieWrap = $('.movie-wrap');

		$('#genre-list li').removeClass('active');

		this.$el.addClass('active');

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

		App.App.navigate('genre/' + genre, {replace : true});
	}

});

App.Views.movieList = new App.Views.MovieList();