JournalApp.Routers.PostsRouter = Backbone.Router.extend({
  routes: {
    "posts/new": "postCreate",
    "posts/:id": "postsShow",
    "posts/:id/edit": "postUpdate"
  },

  initialize: function ($el) {
    this.$rootEl = $el;
  },

  postCreate: function () {
    var post = new JournalApp.Models.Post();
    var formView = new JournalApp.Views.PostForm({
      model: post,
      collection: JournalApp.posts
    });

    this._swapView(formView);
  },

  postsShow: function (id) {
    var post = JournalApp.posts.getOrFetch(id);
    var showView = new JournalApp.Views.PostsShow({
      model: post
    });

    this._swapView(showView);
  },

  postUpdate: function (id) {
    var post = JournalApp.posts.getOrFetch(id);
    var formView = new JournalApp.Views.PostForm({
      collection: JournalApp.posts,
      model: post
    });

    this._swapView(formView);
  },

  _swapView: function (view) {
    if (this._currentView) {
      this._currentView.remove();
    }
    this.$rootEl.html(view.render().$el);
    this._currentView = view;
  }
});
