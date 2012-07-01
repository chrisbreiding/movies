App.Views.Movie = Backbone.View.extend({

	tagName : 'li',

	className : 'movie',

	template : JST['templates/movie'],

	initialize : function () {
		$('#movie-list').append( this.$el.html( this.model.get('title') ) );

		this.bind('genres_ready', this.render, this);
		this.bind('rt_ready', this.render, this);

		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
	},

	events : {
		'click' : 'render'
	},

	render : function () {
		this.remove();
		$('.info').addClass('loading');

		if( !this.model.get('genres') ) {
			this.getGenres();
		} else if ( !this.model.get('critics_score') ) {
			this.getRTInfo();
		} else {
			this.showInfo();
		}
	},

	remove : function () {
        $('.info-box').html('');
	},

    cancel : function (e) {
        e.preventDefault();
    },

	showInfo : function (e) {
		$('#movie-list li').removeClass('active');
		this.$el.addClass('active');

		$('.info').removeClass('loading');

        $('.edit-movie').remove();

		$('.info-box').html( this.template( this.model.toJSON() ) );

        this.addEditTab();
	},

	getGenres : function () {
		var self = this;

		$.ajax({
			url : '/movies/' + this.model.get('id') + '/genres',
			success : function (genres) {
				self.model.set({ genres : genres });
				self.trigger('genres_ready');
			}
		});
	},

	getRTInfo : function () {
		// Pull in data from Rotten Tomatoes and add to model

		var self = this,
			byId = false,
			query = this.model.get('rt_title');

		if ( query.slice(0,3) == '$id' ) {
			// If flagged for special search by $id
			byId = true,
			query = '/movies/' + query.match(/\b\d+\b/) + '.json?';
		} else {
			query = '/movies.json?q=' + encodeURI(query) + '&';
		}

		$.ajax({
			url: App.data.rottenTomatoes.baseUrl + query + 'apikey=' + App.data.rottenTomatoes.apiKey,
			dataType: 'jsonp',
			success: function(data) {
				var movie = byId ? data : data.movies[0],
					// convert runtime to 0:00 format
					minutes = movie.runtime % 60,
					runtime = Math.floor(movie.runtime / 60) + ':' + ( minutes < 10 ? '0' : '' ) + minutes;

				self.model.set({
					critics_score : movie.ratings.critics_score,
					year : movie.year,
					runtime : runtime,
					mpaa_rating : movie.mpaa_rating,
					cast : movie.abridged_cast,
					poster : movie.posters.thumbnail
				});

				self.trigger('rt_ready');
			}
		});
	},

    addEditTab : function () {
        $('<a href="#" class="tab edit-movie" title="Edit Movie"><i class="icon-edit"></i></a>').appendTo('.info-box').on('click', _.bind(this.edit, this));
    },

    edit : function (e) {
        e.preventDefault();
        new App.Views.EditMovie({ model : this.model });
    }

});
