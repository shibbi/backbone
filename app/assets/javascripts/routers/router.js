NewsReader.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "feedsIndex"
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

  _swapView: function(view) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
