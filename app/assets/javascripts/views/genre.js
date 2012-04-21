App.Views.Genre = Backbone.View.extend({

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
		this.$el
			.html( this.model.get('name') )
			.addClass( this.model.get('slug') );
		return this;
	},

	remove : function () {
	},

	genre : function () {
		App.Views.movieList.filterByGenre( this.model.get('slug') );
	}

});
