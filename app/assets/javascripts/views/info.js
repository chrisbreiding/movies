App.Views.Info = Backbone.View.extend({

	el : '.info-box',

	template : JST['templates/info'],

	initialize : function () {
		App.Collections.info.on('add', this.render, this);
		//this.render();
	},

	render : function (model) {
		this.model = model;
		this.$el.html( this.template( model.toJSON() ) );

		if( !!model.get('rt_data') ) {
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
		var template = JST['templates/rt'],
			data = this.model.get('rt_data');

		$('.info-box dl').append( template(data) );
		$('.info-box').prepend('<img src="' + data.poster + '" />');
	}

});

App.Views.info = new App.Views.Info();

