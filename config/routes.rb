Rails.application.routes.draw do
  root 'pages#index'
  get '*path', to: 'pages#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :products, only: [ :index, :show ] do
        resources :reviews, only: [ :create ]
      end
    end
  end
end
