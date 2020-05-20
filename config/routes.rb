Rails.application.routes.draw do
  root "home#top"

  post "/logout", to: "users#logout"
  post "/change-mode", to: "home#change_mode"
  get "/auth/twitter/callback", to: "users#twitter"
  get "/auth/failure", to: "users#failure"

  post "/twitter", to: "users#twitter_post"
  get "/register", to: "users#register"
  post "/register", to: "users#register_post"

  post "/get-user-json", to: "users#get_user_json"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
