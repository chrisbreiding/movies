Movies.RtSearchView = Ember.View.extend

  classNames: ['rt-search']

  hasResults: ->
    @get('controller.searchResults') and (@get('controller.searchResults.length') > 0)

  previous: (e)->
    el = $ e.target
    if el.is 'input'
      el.closest('form').siblings('ul').find('li').last().focus()
    else if el.prevAll('li').length is 0
      el.parent().siblings('form').find('input').focus()
    else
      el.prevAll('li').first().focus()

  next: (e)->
    el = $ e.target
    if el.is 'input'
      el.closest('form').siblings('ul').find('li').first().focus()
    else if el.nextAll('li').length is 0
      el.parent().siblings('form').find('input').focus()
    else
      el.nextAll('li').first().focus()

  keyDown: (e)->
    if @hasResults()
      switch e.keyCode
        when 38 # up
          e.preventDefault()
          @previous e
        when 40 # down
          @next e
        when 9 # tab
          e.preventDefault()
          if e.shiftKey then @previous(e) else @next(e)
