class HomeController < ApplicationController
  protect_from_forgery :except => ["change_mode"]

  def top
    @mode = session[:mode].nil? ? "" : " dark-mode"
    user = User.find_by(id: session[:user_id])

    if user
      if user.color.nil?
        user = nil
      end
    end

    if user
      @user = user
    else
      @user = User.new(
          id: 0,
          image: "",
          name: "",
          description: "",
          url: "",
          twitter_url: "",
          color: "#7F7F7F",
          is_published: false
      )
    end

    @users = User.where(is_published: true)
  end

  def change_mode
    if session[:mode].nil?
      session[:mode] = "dark-mode"
      render plain: "dark-mode"
    else
      session[:mode] = nil
      render plain: "light-mode"
    end
  end
end
