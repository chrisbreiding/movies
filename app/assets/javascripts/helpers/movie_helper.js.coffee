Ember.Handlebars.registerBoundHelper 'humanize_bool', (bool)->
  if bool then 'Yes' else 'No'

Ember.Handlebars.registerBoundHelper 'minutes_to_mixed', (minutes)->
  return '' if isNaN minutes

  hours = Math.floor(minutes / 60)
  remaining_minutes = if minutes % 60 < 10 then '0' else ''
  remaining_minutes += minutes % 60

  "#{hours}:#{remaining_minutes}"
