Movies.RatingMeterComponent = Ember.Component.extend
  classNames: ['rating-wrap']

  rating_width: (->
    "width: #{@get('rating')}px"
  ).property 'rating'
