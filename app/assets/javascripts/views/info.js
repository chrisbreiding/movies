App.Views.Info = Backbone.View.extend({

    className : 'info-box',

    template : JST['templates/info'],

    initialize : function () {
        this.model.on('info_ready', this.render, this);
        this.model.on('destroy', this.remove, this);
        this.model.on('change', this.getInfo, this);

        this.getInfo();
    },

    events : {
        'click .edit-movie' : 'edit'
    },

    getInfo : function () {
        App.dispatcher.trigger('infoLoading');
        this.model.getInfo();
    },

    render : function () {
        App.dispatcher.trigger('infoLoaded');
        this.$el.html( this.template(this.model.toJSON()) ).prependTo('.info-well');
    },

    edit : function (e) {
        e.preventDefault();
        new App.Views.EditMovie({ model : this.model });
    }

});