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
                .expectGET('/movies/.json')
                .respond([
                    { title : 'Super Movie' },
                    { title : 'Awesome Movie' }
                ]);

            $httpBackend
                .expectGET('/movies//genres.json')
                .respond([
                    { name : 'Action' }
                ]);

            scope = $rootScope.$new();
            ctrl = $controller('AppCtrl', { $scope: scope });

            $httpBackend.flush();
        }));

        it('creates movies model fetched from xhr', function () {
            expect(scope.movies.length).toBe(2);
        });

        it('sets a featured movie', function () {
            expect(scope.featuredMovie).toBeDefined();
        });

        it('fetches the genre for the featured movie', function () {
            expect(scope.featuredMovie.genres).toBeDefined();
        });

        it('can set a featured movie', function () {
            scope.setFeaturedMovie(scope.movies[0]);
            expect(scope.featuredMovie).toEqualData(scope.movies[0])
        });

        it('can test if a movie is featured', function () {
            scope.setFeaturedMovie(scope.movies[0]);
            expect(scope.isFeatured(scope.movies[0])).toBe(true);
        });

    });

});