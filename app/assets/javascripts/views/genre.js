App.Views.Genre = Backbone.View.extend({

	tagName : 'li',

	className : 'genre',

	initialize : function () {
		//this.model.on('change', this.render, this);
		//this.model.on('destroy', this.remove, this);
		this.render();
	},

	events : {
		'click' : 'genre'
	},

	render : function () {
		this.$el
			.html( this.model.get('name') )
			.addClass( this.model.get('slug') );

		$('#genre-list').append( this.el );
	},

	remove : function () {
	},

	genre : function () {
		App.Collections.movies.filterByGenre( this.model.get('slug') );
		this.setActive();
	},

	setActive : function () {
		$('#genre-list li').removeClass('active');
		this.$el.addClass('active');
	}

});
