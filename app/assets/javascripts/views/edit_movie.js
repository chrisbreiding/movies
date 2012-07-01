App.Views.EditMovie = Backbone.View.extend({

    className : 'lightbox edit-movie-lightbox',

    template : JST['templates/edit_movie'],

    initialize : function () {
        this.render();
    },

    events : {
        'submit #edit-movie-form' : 'save',
        'click #save' : 'save',
        'click #cancel' : 'cancel'
    },

    render : function () {
        var attrs;

        if( this.model.isNew() ) {
            attrs = {
                title : '',
                chris : '',
                sarah : '',
                shortlist : '',
                button : 'Add Movie'
            };
        } else {
            attrs = {
                title : this.model.get('title'),
                chris : this.model.get('chris') ? 'checked' : '',
                sarah : this.model.get('sarah') ? 'checked' : '',
                shortlist : this.model.get('shortlist') ? 'checked' : '',
                button : 'Save Movie'
            };
        }
        this.$el.append( this.template(attrs) ).appendTo('body').fadeIn();
    },

    save : function (e) {
        e.preventDefault();

        this.model.save( this.getValues(), {
            success : _.bind(this.remove, this)
        });
    },

    getValues : function () {
        return {
            title : $('#title').val(),
            chris : $('#chris').attr('checked') ? 1 : 0,
            sarah : $('#sarah').attr('checked') ? 1 : 0,
            shortlist : $('#shortlist').attr('checked') ? 1 : 0
        };
    },

    cancel : function (e) {
        e.preventDefault();
        this.remove();
    },

    remove : function () {
        this.$el.remove();
    }

});