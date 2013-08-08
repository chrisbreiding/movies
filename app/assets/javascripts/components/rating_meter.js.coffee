Movies.RatingMeterComponent = Ember.Component.extend
  classNameBindings: ['isInvalidRating:rating-invalid:rating-valid']

  storeRating: (->
    rating = @get 'rating'
    @set('storedRating', rating) if rating
  ).observes 'rating'

  isInvalidRating: (->
    rating = @get 'rating'
    !!rating && isNaN(rating) or rating is -1
  ).property 'rating'

  ratingWidth: (->
    rating = @get('rating') || @get('storedRating')
    "width: #{rating}px"
  ).property 'rating'
