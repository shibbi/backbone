NewsReader.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "feedsIndex",
    "feeds/:id": "feedShow"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.collection = new NewsReader.Collections.Feeds();
    this.collection.fetch();
  },

  feedsIndex: function () {
    var view = new NewsReader.Views.FeedIndex({
      collection: this.collection
    });

    this._swapView(view);
  },

  feedShow: function (id) {
    var feed = this.collection.getOrFetch(id);
    var view = new NewsReader.Views.FeedShow({
      model: feed
    });

    this._swapView(view);
  },

  _swapView: function(view) {
    if (this._currentView) {
      this._currentView.remove();
    }
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
