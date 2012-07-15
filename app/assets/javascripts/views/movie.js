App.Views.Movie = Backbone.View.extend({

	tagName : 'li',

	className : 'movie',

	initialize : function () {
        this.render();
	},

	events : {
		'click' : 'info'
	},

	render : function () {
        $('#movie-list').append(
            this.$el.html( this.model.get('title') )
        );
	},

    setActive : function () {
        $('.movie').removeClass('active');
        this.$el.addClass('active');
    },

    info : function () {
        this.setActive();
        new App.Views.Info({ model : this.model });
    }

});
