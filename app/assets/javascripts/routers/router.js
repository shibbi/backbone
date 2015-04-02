NewsReader.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "feedsIndex",
    "feeds/:id": "feedShow"
  },

  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
    this.collection = new NewsReader.Collections.Feeds();
  },

  feedsIndex: function () {
    this.collection.fetch();

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
    if (this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
