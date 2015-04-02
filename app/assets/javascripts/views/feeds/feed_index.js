NewsReader.Views.FeedIndex = Backbone.View.extend({
  template: JST["feeds/feed_index"],

  initialize: function () {
    this.listenTo(this.collection, "sync remove", this.render);
  },

  render: function () {
    var content = this.template({
      feeds: this.collection
    });
    this.$el.html(content);

    var feedFormView = new NewsReader.Views.FeedForm({
      collection: this.collection
    });
    this.$('.feeds').before(feedFormView.render().$el);

    this.collection.each(function (feed) {
      var feedItemView = new NewsReader.Views.FeedIndexItem({
        model: feed,
        collection: this.collection
      });
      this.$('.feeds').append(feedItemView.render().$el);
    }.bind(this));

    return this;
  }

});
