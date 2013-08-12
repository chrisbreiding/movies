Movies.IconButton = Ember.View.extend

  tagName: 'button'

  classNames: ['icon-button']

  layoutName: 'icon_button'

  iconView: Ember.View.extend

    tagName: 'i'

    classNameBindings: ['iconName']

    iconName: (->
      "icon-#{@get('parentView').get('icon')}"
    ).property 'icon'

  click: ->
    @get('controller').send @get('action')
