Movies::Application.routes.draw do

  namespace :api do
    resources :movies do
      resources :genres
    end

    resources :genres do
      resources :movies
    end
  end

  root to: "main#index"

  match '/search/:query', to: 'movies#search'
  match '*path', to: 'main#index'

end
