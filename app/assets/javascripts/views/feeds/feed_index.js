NewsReader.Views.FeedIndex = Backbone.View.extend({
  template: JST["feeds/feed_index"],

  initialize: function () {
    this.listenTo(this.collection, "sync remove", this.render);
    this._subviews = [];
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
    this._subviews.push(feedFormView);

    this.collection.each(function (feed) {
      var feedItemView = new NewsReader.Views.FeedIndexItem({
        model: feed,
        collection: this.collection
      });
      this.$('.feeds').append(feedItemView.render().$el);
      this._subviews.push(feedItemView);
    }.bind(this));


    return this;
  },

  remove: function () {
    this._subviews.forEach( function(subview) {
      subview.remove();
    });
    Backbone.View.prototype.remove.call(this);
  }

});
