Movies.RatingMeterComponent = Ember.Component.extend
  classNameBindings: ['isInvalidRating:rating-invalid:rating-valid']

  isInvalidRating: (->
    rating = @get 'rating'
    return false if !rating
    isNaN(rating) or rating is -1
  ).property 'rating'

  ratingWidth: (->
    "width: #{@get('rating')}px"
  ).property 'rating'
