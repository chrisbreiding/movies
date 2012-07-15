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
    },

    getInfo : function () {
        $.when(this.getGenres(), this.getRTInfo()).done(
            _.bind(function () {
                this.trigger('info_ready');
            }, this)
        );
    },

    getGenres : function () {
        return $.ajax({
            url : '/movies/' + this.get('id') + '/genres',
            success : _.bind(function (genres) {
                this.set({ genres : genres }, { silent : true });
            }, this)
        });
    },

    getRTInfo : function () {
        // Pull in data from Rotten Tomatoes and add to model

        var byId = false,
            query = this.get('rt_title');

        if ( query.slice(0,3) == '$id' ) {
            // If flagged for special search by $id
            byId = true,
            query = '/movies/' + query.match(/\b\d+\b/) + '.json?';
        } else {
            query = '/movies.json?q=' + encodeURI(query) + '&';
        }

        return $.ajax({
            url: App.data.rottenTomatoes.baseUrl + query + 'apikey=' + App.data.rottenTomatoes.apiKey,
            dataType: 'jsonp',
            success: _.bind(function(data) {
                var movie = byId ? data : data.movies[0],
                    // convert runtime to 0:00 format
                    minutes = movie.runtime % 60,
                    runtime = Math.floor(movie.runtime / 60) + ':' + ( minutes < 10 ? '0' : '' ) + minutes;

                this.set({
                    critics_score : movie.ratings.critics_score,
                    year : movie.year,
                    runtime : runtime,
                    mpaa_rating : movie.mpaa_rating,
                    cast : movie.abridged_cast,
                    poster : movie.posters.thumbnail
                }, { silent : true});
            }, this)
        });
    }

});