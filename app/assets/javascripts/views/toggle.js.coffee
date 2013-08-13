Movies.ToggleView = Ember.View.extend

  templateName: 'toggle_view'

  classNames: ['toggle']
  classNameBindings: ['toggle:toggle-on']

  click: ->
    @set 'toggle', !@get('toggle')
