angular.module('movieFilters', [])

.filter('runtime', function () {
    return function(runtime) {
        if ( isNaN(runtime) ) return '';

        var hours = Math.floor(runtime / 60),
            minutes = (runtime % 60 < 10 ? '0' : '' ) + (runtime % 60);

        return hours + ':' + minutes;
    };
});