describe('Controllers', function () {

    beforeEach(function(){
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('moviesApp'));

    describe('AppCtrl', function () {
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;

            $httpBackend
                .when('GET', '/movies/.json')
                .respond([
                    {
                        title : 'Super Movie',
                        rt_id : 13417
                    },
                    {
                        title : 'Awesome Movie',
                        rt_id : 13417
                    }
                ]);

            $httpBackend
                .when('GET', '/movies//genres.json')
                .respond([
                    { name : 'Action' }
                ]);

            $httpBackend
                .when('JSONP', 'http://api.rottentomatoes.com/api/public/v1.0/movies/13417.json?apikey=hedyxeyu7a5yggpbs7jwvsqw&callback=JSON_CALLBACK')
                .respond({
                    "id":13417,
                    "title":"American Splendor",
                    "year":2003,
                    "genres":[
                        "Drama",
                        "Art House & International",
                        "Comedy"
                    ],
                    "mpaa_rating":"R",
                    "runtime":100,
                    "critics_consensus":"Exhilarating both stylistically and for its entertaining, moving portrayal of an everyman, American Splendor is a portrait of a true underground original.",
                    "release_dates":{
                        "theater":"2003-08-15",
                        "dvd":"2004-02-03"
                    },
                    "ratings":{
                        "critics_rating":"Certified Fresh",
                        "critics_score":94,
                        "audience_rating":"Upright",
                        "audience_score":84
                    },
                    "synopsis":"",
                    "posters":{
                        "thumbnail":"http://content9.flixster.com/movie/10/85/16/10851667_mob.jpg",
                        "profile":"http://content9.flixster.com/movie/10/85/16/10851667_pro.jpg",
                        "detailed":"http://content9.flixster.com/movie/10/85/16/10851667_det.jpg",
                        "original":"http://content9.flixster.com/movie/10/85/16/10851667_ori.jpg"
                    },
                    "abridged_cast":[
                        {
                            "name":"Paul Giamatti",
                            "id":"162683649",
                            "characters":[
                                "Harvey Pekar"
                            ]
                        },
                        {
                            "name":"Hope Davis",
                            "id":"162653969",
                            "characters":[
                                "Joyce Brabner"
                            ]
                        },
                        {
                            "name":"Harvey Pekar",
                            "id":"162691927",
                            "characters":[
                                "Real Harvey"
                            ]
                        },
                        {
                            "name":"Shari Springer Berman",
                            "id":"162691926",
                            "characters":[
                                "Interviewer"
                            ]
                        },
                        {
                            "name":"James Urbaniak",
                            "id":"162711975",
                            "characters":[
                                "Robert Crumb"
                            ]
                        }
                    ],
                    "abridged_directors":[
                        {"name":"Shari Springer Berman"},
                        {"name":"Robert Pulcini"}
                    ],
                    "studio":"Fine Line Features",
                    "alternate_ids":{
                        "imdb":"0305206"
                    },
                    "links":{
                        "self":"http://api.rottentomatoes.com/api/public/v1.0/movies/13417.json",
                        "alternate":"http://www.rottentomatoes.com/m/american_splendor/",
                        "cast":"http://api.rottentomatoes.com/api/public/v1.0/movies/13417/cast.json",
                        "clips":"http://api.rottentomatoes.com/api/public/v1.0/movies/13417/clips.json",
                        "reviews":"http://api.rottentomatoes.com/api/public/v1.0/movies/13417/reviews.json",
                        "similar":"http://api.rottentomatoes.com/api/public/v1.0/movies/13417/similar.json"
                    }
                });

            scope = $rootScope.$new();
            ctrl = $controller('AppCtrl', { $scope: scope });

            $httpBackend.flush();
        }));

        it('creates movies model fetched from xhr', function () {
            expect(scope.movies.length).toBe(2);
        });

        it('sets a random featured movie on start', function () {
            expect(scope.featuredMovie).toBeDefined();
        });

        it('can set a featured movie', function () {
            scope.setFeaturedMovie(scope.movies[0]);
            expect(scope.featuredMovie).toEqualData(scope.movies[0])
        });

        it('can test if a movie is featured', function () {
            scope.setFeaturedMovie(scope.movies[0]);
            expect(scope.isFeatured(scope.movies[0])).toBe(true);
        });

        it('fetches the genre for the featured movie', function () {
            expect(scope.featuredMovie.genres).toBeDefined();
        });

        it('fetches rotten tomatoes data for the featured movie', function () {
            expect(scope.featuredMovie.critics_rating).toBeDefined();
            expect(scope.featuredMovie.year).toBeDefined();
            expect(scope.featuredMovie.cast).toBeDefined();
            expect(scope.featuredMovie.mpaa_rating).toBeDefined();
        });

    });

});