NewsReader.Views.FeedIndexItem = Backbone.View.extend({
  template: JST["feeds/feed_index_item"],
  tagName: 'li',

  events: {
    "click button": "deleteFeed"
  },

  render: function () {
    var content = this.template({
      feed: this.model
    });

    this.$el.html(content);

    return this;
  },

  deleteFeed: function () {
    this.$el.remove();
    this.model.destroy({
      success: function () {
        this.collection.remove(this.model);
      }.bind(this)
    });
  }
});
