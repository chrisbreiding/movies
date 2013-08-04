Movies.RatingMeterComponent = Ember.Component.extend
  classNameBindings: ['isValidRating:rating-valid:rating-invalid']

  isValidRating: (->
    !isNaN(@get('rating')) && @get('rating') != -1
  ).property 'rating'

  ratingWidth: (->
    "width: #{@get('rating')}px"
  ).property 'rating'
