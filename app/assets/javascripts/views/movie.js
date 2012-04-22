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

		$.ajax({
			url : '/movies/' + this.model.get('id'),
			success : function (data) {
				var infoCollection = App.Collections.info.add(data),
					newOne = infoCollection.at( infoCollection.length - 1 );

				newOne.set({ rt_data : true });
			}
		});
	}

});
