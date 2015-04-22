class ApplicationController < ActionController::Base
  protect_from_forgery

  helper_method  :current_user

  def current_user
    User.find_by_session_token(session[:session_token])
  end

  def login!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def ensure_logged_in
    redirect_to new_session_url unless current_user
  end
end
