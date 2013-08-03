DS.RESTAdapter.reopen
  namespace: 'api'

Movies.Store = DS.Store.extend
  adapter: DS.RESTAdapter.create()

