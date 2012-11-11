angular.module('movieDirectives', [])

.directive('rtRating', function () {
    return function (scope, elem, attrs) {
        attrs.$observe('rtRating', function (rating) {
            var ratingElem, ratingBar;

            if ( rating === '-1' ) {
                elem.text('No rating');
            } else {
                ratingElem = angular.element('<span />');
                ratingBar = angular.element('<span />');

                ratingElem
                    .addClass('rating')
                    .append( ratingBar.css({width : rating }) );

                elem
                    .html(rating + '%')
                    .append(ratingElem);
            }
        });
    };
});