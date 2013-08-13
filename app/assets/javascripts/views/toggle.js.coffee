Button = Ember.View.extend

  tagName: 'button'

  onLabel: (->
    @get 'parentView.on'
  ).property('parentView.on')

  offLabel: (->
    @get 'parentView.off'
  ).property('parentView.off')

  click: ->
    @set 'parentView.toggle', @get('changeTo')

Movies.ToggleView = Ember.View.extend

  templateName: 'toggle_view'

  classNames: ['toggle']
  classNameBindings: ['toggle:toggle-on']

  onButton: Button.extend(changeTo: false)
  offButton: Button.extend(changeTo: true)
