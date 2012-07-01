App.Models.Movie = Backbone.Model.extend({

    url : function() {
        var base = 'movies';
        if (this.isNew()) return base;
        return base + '/' + this.id;
    },

    initialize : function () {
        this.on('error', this.error);
    },

    validate : function (attrs) {
        if(!attrs.title) {
            return 'Please input a movie title';
        }
    },

    error : function (model, error) {
        $('#title-control').addClass('error').append('<span class="help-block">' + error + '</span>');
    }

});