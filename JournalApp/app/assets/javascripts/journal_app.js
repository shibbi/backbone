window.JournalApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    JournalApp.posts = new JournalApp.Collections.Posts();

    JournalApp.posts.fetch();
    var sidebar = new JournalApp.Views.PostsIndex({
      collection: JournalApp.posts
    });
    $('#sidebar').html(sidebar.render().$el);

    new JournalApp.Routers.PostsRouter($('#content'));
    Backbone.history.start();
  }
};

$(document).ready(function(){
  JournalApp.initialize();
});
