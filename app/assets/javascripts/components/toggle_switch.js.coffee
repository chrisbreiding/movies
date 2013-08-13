Movies.ToggleSwitchComponent = Ember.Component.extend

  classNames: ['toggle']

  classNameBindings: ['toggle:toggle-on']

  click: ->
    @set 'toggle', !@get('toggle')
