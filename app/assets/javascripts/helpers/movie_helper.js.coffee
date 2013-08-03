Ember.Handlebars.registerBoundHelper 'humanize_bool', (bool)->
  if bool then 'Yes' else 'No'
