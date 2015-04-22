class UpdateFeedsTable < ActiveRecord::Migration
  def up
    remove_index :feeds, :url
    add_column :feeds, :user_id, :string, null: false, default: 1
    add_index :feeds, [:url, :user_id], unique: true
    add_column :feeds, :favorite, :boolean, null: false, default: false
  end

  def down
    remove_index :feeds, [:url, :user_id]
    remove_column :feeds, :user_id
    remove_column :feeds, :favorite
    add_index :feeds, :url, unique: true
  end
end
