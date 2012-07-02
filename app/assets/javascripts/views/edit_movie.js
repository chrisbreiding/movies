App.Views.EditMovie = Backbone.View.extend({

    className : 'lightbox edit-movie-lightbox',

    template : JST['templates/edit_movie'],

    initialize : function () {
        this.render();
    },

    events : {
        'blur #title'               : 'checkTitle',
        'submit #edit-movie-form'   : 'save',
        'click #save'               : 'save',
        'click #cancel'             : 'cancel',
        'click #form-close'         : 'cancel'
    },

    render : function () {
        var attrs = this.getAttrs();
        this.$el.append( this.template(attrs) ).appendTo('body').fadeIn();
        $('body').addClass('lightbox-open');
        $('#genres').chosen();
        $('#title').focus();
    },

    getAttrs : function () {
        return this.model.isNew() ? this.newAttrs() : this.oldAttrs();
    },

    newAttrs : function () {
        return {
            heading : 'Add New Movie',
            title : '',
            chris : '',
            sarah : '',
            shortlist : '',
            genres : App.Collections.genres.models.map(function (model) {
                return model.attributes;
            }),
            button : 'Add Movie'
        };
    },

    oldAttrs : function () {
        return {
            heading : 'Edit Movie',
            title : this.model.get('title'),
            chris : this.model.get('chris') ? 'checked' : '',
            sarah : this.model.get('sarah') ? 'checked' : '',
            shortlist : this.model.get('shortlist') ? 'checked' : '',
            genres : App.Collections.genres.models.map(function (model) {
                return model.attributes;
            }),
            button : 'Save Movie'
        };
    },

    checkTitle : function () {
        if( $('#title').val() !== '') {
            $('#title-control')
                .removeClass('error')
                .find('.help-block')
                    .remove();
        }
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
            shortlist : $('#shortlist').attr('checked') ? 1 : 0,
            genres : $('#genres').val()
        };
    },

    cancel : function (e) {
        e.preventDefault();
        this.$el.remove();
        $('body').removeClass('lightbox-open');
    }

});