# == Schema Information
#
# Table name: feeds
#
#  id         :integer          not null, primary key
#  url        :string(255)      not null
#  title      :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#

require 'open-uri'

class Feed < ActiveRecord::Base
  validates :title, :url, presence: true
  has_many :entries, :dependent => :destroy, order: "published_at DESC"

  def self.find_or_create_by_url(url)
    feed = Feed.find_by_url(url)
    return feed if feed

    begin
      feed_data = SimpleRSS.parse(open(url))
      feed = Feed.create!(title: feed_data.title, url: url)
      feed_data.entries.each do |entry_data|
        Entry.create_from_json!(entry_data, feed)
      end
    rescue
      return nil
    end

    feed
  end

  def latest_entries
    if self.updated_at < 30.seconds.ago
      reload
    end

    entries
  end

  def reload
    # reloads entries
    self.touch #this causes the updated_at column to be updated
    begin
      feed_data = SimpleRSS.parse(open(url))
      existing_entry_guids = Entry.pluck(:guid).sort
      feed_data.entries.each do |entry_data|
        unless existing_entry_guids.include?(entry_data.guid)
          Entry.create_from_json!(entry_data, self)
        end
      end

      self
    rescue SimpleRSSError
      return false
    end
  end
end
