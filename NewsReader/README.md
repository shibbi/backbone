# NewsReader

To run locally:

* `bundle install`
* `bundle exec rake db:create db:migrate db:seed` or `bundle exec rake
  db:setup` for Rails 4+
* `rails s` and navigate to `localhost:3000`

Three feeds with their entries will be created upon running `rake
db:seed`.
