Movies.PickerView = Ember.View.extend

  templateName: 'picker_view'

  classNames: ['picker']

  unpicked: (->
    collection = @get 'collection'
    picked = @get 'picked'

    collection.filter (item)->
      !picked.map( (pickedItem)->
        pickedItem.get('id')
      ).contains item.get('id')
  ).property('picked.@each', 'collection.@each')

  iconRemove: Ember.View.extend

    tagName: 'i'

    classNames: ['icon-remove']

    click: ->
      debugger

  iconAdd: Ember.View.extend

    tagName: 'i'

    classNames: ['icon-plus']

    click: ->
      debugger
