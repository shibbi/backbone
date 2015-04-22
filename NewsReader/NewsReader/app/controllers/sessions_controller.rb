class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(user_params)
    if @user
      login!(@user)
      redirect_to :root
    else
      flash[:errors] = ['Incorrect login credentials']
      @user = User.new(user_params)
      render :new
    end
  end

  def destroy
    logout!
    redirect_to :root
  end
end
