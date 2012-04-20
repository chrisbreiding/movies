App.Views.Movie = Backbone.View.extend({

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
		this.$el.html( this.model.get('title') );
		return this;
	},

	remove : function () {
	},

	showInfo : function (e) {
		$('#movie-list li').removeClass('active');

		this.$el.addClass('active');

		new App.Views.Info({ model : this.model });
	}

});
