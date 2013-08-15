Movies.RtSearchView = Ember.View.extend

  classNames: ['rt-search']

  keyDown: (e)->
    if e.keyCode is 9
      e.preventDefault()
      if e.shiftKey
        @get('controller').send 'previousResult'
      else
        @get('controller').send 'nextResult'
