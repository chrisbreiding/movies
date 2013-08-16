Movies.RtSearchResult = Ember.View.extend

  tagName: 'li'

  attributeBindings: ['tabindex']

  tabindex: 0

  focusIn: ->
    @get('controller').send 'movieSelected', @get('movie')
