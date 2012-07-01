App.Views.App = Backbone.View.extend({

	el : 'body',

	initialize : function () {
		this.$searchInput = $('#search-input');
		this.$genreList = $('#genre-list');
		this.$movieList = $('#movie-list');
		this.$movieWrap = $('.movie-wrap');
	},

	events : {
		'click h1 span'			: 'home',
		'submit #movie-search'	: 'search',
		'click #clear-search'	: 'clearSearch',
        'click .add-movie'      : 'addMovie'
	},

	home : function () {
		this.$searchInput.val('');
		this.$genreList.find('li').show();
		this.$movieList.html('');
		$('.info-box').html('');

		$('.active').removeClass('active');

		App.Collections.movies.reset();
		App.Routers.app.navigate('', {replace : true});
	},

	search : function (e) {
		e.preventDefault();

		var self = this,
			query = this.$searchInput.val(),
			regexQuery = new RegExp(query, 'i');

		$('.active').removeClass('active');

		this.$genreList.find('.error').remove();

		this.$movieWrap.addClass('loading');

		this.$movieList.html('');

		if(query !== '') {

			// movie search
			$.ajax({

				url : '/search/' + query,

				success : function (data) {
					self.$movieWrap.removeClass('loading');
					App.Collections.movies.reset(data);

                    if( self.$movieList.find('li:visible').length === 0 ) {
                        self.$movieList.append('<li class="error">No matching movies</li>');
                    }
				},

				error : function (jqXHR, textStatus, errorThrown) {
					self.$movieWrap.removeClass('loading');
					App.Collections.movies.reset();
				}

			});

			// genre search
			this.$genreList.find('li').each(function(index) {

				var $this = $(this),
					title = $this.html();

				if( regexQuery.test(title) ) {
					$this.show();
				} else {
					$this.hide();
				}

			});

			if( this.$genreList.find('li:visible').length === 0 ) {
				this.$genreList.append('<li class="error">No matching genres</li>');
			}

		} else {
			this.clearSearch();
		}

		App.Routers.app.navigate('', {replace : true});
	},

	clearSearch : function (e) {
		if(e) e.preventDefault();
		this.$searchInput.val('');
		this.$genreList.find('li').show();
		this.$movieWrap.removeClass('loading');
		this.$movieList.html('');
	},

    addMovie : function (e) {
        e.preventDefault();
        new App.Views.EditMovie({ model : new App.Models.Movie() });
    }

});