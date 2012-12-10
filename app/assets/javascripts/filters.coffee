movieFilters = angular.module 'movieFilters', []

movieFilters.filter 'runtime', ->
  (runtime) ->
    return '' if isNaN runtime

    hours = Math.floor( runtime / 60 )
    minutes = if runtime % 60 < 10 then '0' else ''
    minutes += runtime % 60

    "#{hours}:#{minutes}"
