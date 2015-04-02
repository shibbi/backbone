NewsReader::Application.routes.draw do
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show]

  namespace :api do
    resources :feeds, only: [:index, :create, :show, :destroy] do
      resources :entries, only: [:index]
    end
  end

  root to: "static_pages#index"
end
