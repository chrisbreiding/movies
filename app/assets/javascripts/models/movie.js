App.Models.Movie = Backbone.RelationalModel.extend({

    relations : [{
        type : 'HasMany',
        key : 'genres',
        relatedModel : 'App.Models.GenreMovie',
        reverseRelation : { key: 'movie' }
    }],

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