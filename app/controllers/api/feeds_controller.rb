class Api::FeedsController < ApplicationController
  before_action :ensure_logged_in

  def index
    render :json => current_user.feeds
  end

  def show
    feed = Feed.find(params[:id])
    if feed.user != current_user
      render :json => { error: "can't access feed that's not yours"},
                      status: 403
    else
      render :json => feed, include: :latest_entries
    end
  end

  def create
    feed = Feed.find_or_create_by_url(feed_params[:url], current_user.id)
    if feed
      render :json => feed
    else
      render :json => { error: "invalid url" }, status: :unprocessable_entity
    end
  end

  def destroy
    feed = Feed.find(params[:id])
    if feed.user != current_user
      render :json => { error: "can't delete feed that's not yours"},
                      status: 403
    else
      feed.destroy
      render :json => current_user.feeds
    end
  end

  private

  def feed_params
    params.require(:feed).permit(:title, :url)
  end
end
