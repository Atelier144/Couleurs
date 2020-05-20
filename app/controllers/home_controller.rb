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
      @user_id = user.id
      @user_image = user.image.url
      @user_color = user.color
    else
      @user_id = 0
      @user_image = ""
      @user_color = "#FFFFFF"
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
