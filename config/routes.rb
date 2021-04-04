Rails.application.routes.draw do
  root 'pages#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :products, only: [ :index, :show ] do
        resources :reviews, only: [ :create, :destroy ]
      end
    end
  end

  get '*path', to: 'pages#index'
end
