class UsersController < ApplicationController
  protect_from_forgery :except => ["twitter_post", "register_post", "logout"]

  def twitter
    auth_hash = request.env["omniauth.auth"]
    @provider = auth_hash[:provider]
    @uid = auth_hash[:uid]
    @name = auth_hash[:info][:name]
    @image = auth_hash[:info][:image]
    @description = auth_hash[:info][:description]
    @url = auth_hash[:info][:urls][:Website]
    @twitter_url = auth_hash[:info][:urls][:Twitter]
    @mode = session[:mode].nil? ? "" : " dark-mode"
  end

  def twitter_post
    if params[:provider] == "twitter"
      user = User.find_by(twitter_uid: params[:uid])
      if user
        session[:user_id] = user.id
        if user.color.nil?
          redirect_to("/register")
        else
          redirect_to("/")
        end
      else
        new_user = User.new(
            twitter_uid: params[:uid],
            name: params[:name],
            remote_image_url: params[:image],
            description: params[:description],
            url: params[:url],
            twitter_url: params[:twitter_url],
            color: nil,
            is_published: false
        )
        if new_user.save
          session[:user_id] = new_user.id
          redirect_to("/register")
        else
          redirect_to("/")
        end
      end
    else
      redirect_to("/")
    end
  end

  def register
    @user = User.find_by(id: session[:user_id])
    @mode = session[:mode].nil? ? "" : " dark-mode"
  end

  def register_post
    user = User.find_by(id: session[:user_id])
    user.name = params[:name]
    user.description = params[:description]
    user.url = params[:url]
    user.color = params[:color]
    user.is_published = true

    if user.save
      redirect_to("/")
    else
      redirect_to("/register")
    end
  end

  def failure
    redirect_to("/")
  end

  def logout
    session[:user_id] = nil
    redirect_to("/")
  end

  def get_user_json
    user = User.find_by(id: params[:id])
    render json: user
  end
end
