
_.templateSettings = {
	interpolate: /\{\{\=(.+?)\}\}/g,
	evaluate: /\{\{(.+?)\}\}/g
};

var App = {
	Models : {},
	Collections : {},
	Views : {},
	Routers : {},
	data : {},
	init: function() {
		this.Routers.app = new App.Routers.App();
		Backbone.history.start({ pushState: true });
	}
};

App.dispatcher = _.clone(Backbone.Events);

App.data.rottenTomatoes = {
	baseUrl : "http://api.rottentomatoes.com/api/public/v1.0",
	apiKey : "hedyxeyu7a5yggpbs7jwvsqw"
};

$(function () {

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

	App.init();

});