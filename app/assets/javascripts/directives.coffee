movieDirectives = angular.module 'movieDirectives', []

movieDirectives.directive 'rtRating', ->
  (scope, elem, attrs) ->
    attrs.$observe 'rtRating', (rating) ->
      if rating is '-1'
        elem.text 'No rating'
      else
        ratingElem = angular.element '<span />'
        ratingBar = angular.element '<span />'

        ratingElem
          .addClass('rating')
          .append ratingBar.css width: rating

        elem
          .html("#{rating}%")
          .append ratingElem

movieDirectives.directive 'chosen', ->
  (scope, elem, attrs) ->
    scope.$watch 'genres', (newVal, oldVal) ->
      elem.trigger 'liszt:updated'
    , true
    elem.chosen()
