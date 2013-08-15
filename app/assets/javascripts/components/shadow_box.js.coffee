$body = $ document.body

Movies.ShadowBoxComponent = Ember.Component.extend

  classNames: ['shadow-box']

  didInsertElement: ->
    $body.addClass 'shadow-box-present'

  willDestroyElement: ->
    $body.removeClass 'shadow-box-present'
