NewsReader.Views.FeedForm = Backbone.View.extend({
  template: JST["feeds/feed_form"],
  tagName: 'form',

  events: {
    "submit": "addFeed"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  addFeed: function (event) {
    event.preventDefault();

    this.$('.errors').empty();

    var data = this.$el.serializeJSON();
    var feed = new NewsReader.Models.Feed(data);
    feed.save({}, {
      success: function () {
        this.collection.add(feed);
      }.bind(this),
      error: function (model, response) {
        this.$el.prepend('<strong class="errors">' +
                            response.responseJSON.error +
                         '<br></strong>');
      }.bind(this)
    });
  }
});
