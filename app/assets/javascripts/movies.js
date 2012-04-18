_.templateSettings = {
	interpolate: /\{\{\=(.+?)\}\}/g,
	evaluate: /\{\{(.+?)\}\}/g
};

$(function() {

	var $window = $(window),
		scrollPersist = function (el) {
			var $el				= $(el),
				$elPersister	= $(el + '-persister');

			return function () {

				var offset		= $el.offset(),
					scrollTop	= $window.scrollTop();

				$elPersister.css({ left : offset.left - 20 });

				if ( scrollTop > offset.top - 10 ) {
					$el.css({ visibility : 'hidden' });
					$elPersister.show();
				} else {
					$el.css({ visibility : 'visible' });
					$elPersister.hide();
				}

			};

		},
		infoPersist = scrollPersist('.info');

	$window
		.scroll(infoPersist)
		.trigger('scroll');

	var rottenTomatoes = {

		baseUrl : "http://api.rottentomatoes.com/api/public/v1.0",

		apiKey : "hedyxeyu7a5yggpbs7jwvsqw"

	};

	var Genre = Backbone.Model.extend();

	var GenreCollection = Backbone.Collection.extend({

		model : Genre,

		url : '/data/genres'

	});

	var genreList = new GenreCollection();

	var Movie = Backbone.Model.extend();

	var MovieCollection = Backbone.Collection.extend({ model : Movie });

	var movieList = new MovieCollection();

	var MovieCache = Backbone.Model.extend();

	var MovieCacheCollection = Backbone.Collection.extend({ model : MovieCache });

	var movieCacheList = new MovieCacheCollection();

	var GenreView = Backbone.View.extend({

		tagName : 'li',

		className : 'genre',

		initialize : function () {

			//this.model.on('change', this.render, this);
			//this.model.on('destroy', this.remove, this);

		},

		events : {

			'click' : 'genre'

		},

		render : function () {

			this.$el.html( this.model.get('name') ).addClass( this.model.get('slug') );
			return this;

		},

		remove : function () {

		},

		genre : function () {

			movieListView.filterByGenre( this.model.get('slug') );

		}

	});

	var GenreListView = Backbone.View.extend({

		el : '#genre-list',

		initialize : function () {

			genreList.on('add',   this.addOne, this);
			genreList.on('reset', this.addAll, this);
			genreList.on('all',   this.render, this);

			genreList.fetch();

		},

		events : {

		},

		render : function () {

		},

		addOne : function (genre) {

			var view = new GenreView({
				model	: genre,
				id		: 'g' + genre.get('id')
			});

			$('#genre-list').append(view.render().el);

		},

		addAll : function () {

			genreList.each(this.addOne);

			this.$el.trigger('genres-loaded');

		}

	});

	var genreListView = new GenreListView();

	var InfoView = Backbone.View.extend({

		el : '.info-box',

		template : _.template( $('#info-template').html() ),

		initialize : function () {

			this.render();

		},

		render : function () {

			this.$el.html( this.template( this.model.toJSON() ) );

			if( !!this.model.get('rt_data') ) {

				this.showRTInfo();

			} else {

				this.getRTInfo();

			}

		},

		getRTInfo : function () {

			// Pull in data from Rotten Tomatoes and add to model

			var self = this,
				byId = false,
				query = this.model.get('rt_title');

			if ( query.slice(0,3) == '$id' ) {	// If flagged for special search by $id
				byId = true,
				query = '/movies/' + query.match(/\b\d+\b/) + '.json?';
			} else {
				query = '/movies.json?q=' + encodeURI(query) + '&';
			}

			$.ajax({

				url: rottenTomatoes.baseUrl + query + 'apikey=' + rottenTomatoes.apiKey,

				dataType: 'jsonp',

				success: function(data) {

					var movie = byId ? data : data.movies[0],
						// convert runtime to 0:00 format
						minutes = movie.runtime % 60,
						runtime = Math.floor(movie.runtime / 60) + ':' + ( minutes < 10 ? '0' : '' ) + minutes;

					self.model.set({

						rt_data : {

							critics_score : movie.ratings.critics_score,

							year : movie.year,

							runtime : runtime,

							mpaa_rating : movie.mpaa_rating,

							cast : movie.abridged_cast,

							poster : movie.posters.thumbnail

						}

					});

					self.showRTInfo();

				}

			});

		},

		showRTInfo : function () {

			var rtData = this.model.get('rt_data');

			$('.info-box dl').append( _.template( $('#rt-template').html(), rtData ) );

			$('.info-box').prepend('<img src="' + rtData.poster + '" />');

		}

	});

	var MovieView = Backbone.View.extend({

		tagName : 'li',

		className : 'movie',

		initialize : function () {

			//this.model.on('change', this.render, this);
			//this.model.on('destroy', this.remove, this);

		},

		events : {
			'click' : 'showInfo'
		},

		render : function () {

			this.$el.html( this.model.get('movie_title') );
			return this;

		},

		remove : function () {

		},

		showInfo : function (e) {

			$('#movie-list li').removeClass('active');

			this.$el.addClass('active');

			new InfoView({ model : this.model });

		}

	});

	var MovieListView = Backbone.View.extend({

		el : '#movie-list',

		initialize : function () {

			movieList.on('add',   this.addOne, this);
			movieList.on('reset', this.addAll, this);
			//movieList.on('all',   this.render, this);

		},

		events : {

		},

		render : function () {

		},

		addOne : function (movie) {

			var view = new MovieView({
				model	: movie,
				id		: 'm' + movie.get('movie_id')
			});

			$('#movie-list').append(view.render().el);

		},

		addAll : function () {

			movieList.each(this.addOne);

		},

		filterByGenre : function (genre) {

			var cachedMoviesModel = movieCacheList.get(genre),
				$movieWrap = $('.movie-wrap');

			$('#genre-list li').removeClass('active');

			this.$el.addClass('active');

			$('#movie-list').html('');

			if ( !!cachedMoviesModel ) {

				movieList.reset( cachedMoviesModel.get('movies') );

			} else {

				$movieWrap.addClass('loading');

				$.get('/data/genre/' + genre, function(data) {

					$movieWrap.removeClass('loading');

					movieList.reset(data);

					movieCacheList.add({
						id : genre,
						movies : data
					});

				});

			}

			MovieApp.navigate('genre/' + genre, {replace : true});

		}

	});

	var movieListView = new MovieListView();

	var AppView = Backbone.View.extend({

		el : '.container',

		events : {

			'click h1 span' : 'clear',
			'submit #movie-search' : 'search'

		},

		clear : function () {

			$('#search-input').val('');

			$('#genre-list').find('li').show();

			$('.active').removeClass('active');

			$('#movie-list, .info-box').html('');

			movieList.reset();

			MovieApp.navigate('', {replace : true});
		},

		search : function (e) {

			var query = $('#search-input').val(),
				regexQuery = new RegExp(query, 'i'),
				$genreList = $('#genre-list'),
				$movieWrap = $('.movie-wrap'),
				$movieList = $('#movie-list');

			e.preventDefault();

			$('.active').removeClass('active');

			$genreList.find('.error').remove();

			$movieWrap.addClass('loading');

			$movieList.html('');

			if(query !== '') {

				// movie search
				$.ajax({

					url : '/data/search/' + query,

					success : function (data) {

						$movieWrap.removeClass('loading');

						movieList.reset(data);

					},

					error : function (jqXHR, textStatus, errorThrown) {

						$movieWrap.removeClass('loading');

						movieList.reset();

						$movieList.append('<li class="error">No matching movies</li>');
					}

				});

				// genre search
				$genreList.find('li').each(function(index) {

					var $this = $(this),
						title = $this.html();

					if( regexQuery.test(title) ) {
						$this.show();
					} else {
						$this.hide();
					}

				});

				if( $genreList.find('li:visible').length === 0 ) {
					$genreList.append('<li class="error">No matching genres</li>');
				}

			} else {

				$genreList.find('li').show();

				$movieWrap.removeClass('loading');

				$movieList.html('');

			}

			MovieApp.navigate('', {replace : true});

		}

	});

	var MovieApp = Backbone.Router.extend({

		initialize : function () {

			new AppView();
			Backbone.history.start({ pushState: true });

		},

		routes : {

			'genre/:genre' : 'genre'

		},

		genre : function (genre) {

			movieListView.filterByGenre(genre);

		}

	});

	// new MovieApp();

});