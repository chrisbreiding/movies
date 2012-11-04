Movies::Application.routes.draw do

  resources :movies do
    resources :genres
  end

  resources :genres do
    resources :movies
  end

  root to: "main#index"

  match '/search/:query', to: 'movies#search'
  match '*path', to: 'movies#index'

end
