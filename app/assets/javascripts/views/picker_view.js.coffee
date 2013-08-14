Movies.PickerView = Ember.View.extend

  templateName: 'picker_view'

  tagName: 'ul'

  classNames: ['picker']

  itemView: Ember.View.extend

    tagName: 'li'

    templateName: 'picker_item'

    classNameBindings: ['isPicked']

    isPicked: (->
      @get('parentView.picked').map( (item)->
        item.get('id')
      ).contains @get('item.id')
    ).property 'item', 'parentView.picked.@each'

    label: (->
      @get('item').get @get('labelProperty')
    ).property 'item', 'labelProperty'

    click: ->
      picked = @get 'parentView.picked'
      if @get 'isPicked'
        picked.removeObject @get('item')
      else
        picked.pushObject @get('item')



