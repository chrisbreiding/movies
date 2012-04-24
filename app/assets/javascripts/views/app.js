App.Views.App = Backbone.View.extend({

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

		App.Collections.movies.reset();

		App.Routers.app.navigate('', {replace : true});
	},

	search : function (e) {
		e.preventDefault();

		var query = $('#search-input').val(),
			regexQuery = new RegExp(query, 'i'),
			$genreList = $('#genre-list'),
			$movieWrap = $('.movie-wrap'),
			$movieList = $('#movie-list');

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

					App.Collections.movies.reset(data);

				},

				error : function (jqXHR, textStatus, errorThrown) {

					$movieWrap.removeClass('loading');

					App.Collections.movies.reset();

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

		App.Routers.app.navigate('', {replace : true});
	}

});