App.Models.Genre = Backbone.RelationalModel.extend({

    relations : [{
        type : 'HasMany',
        key : 'movies',
        relatedModel : 'App.Models.GenreMovie',
        reverseRelation : { key: 'genre' }
    }]

});