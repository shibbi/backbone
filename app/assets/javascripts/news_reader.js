window.NewsReader = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new NewsReader.Routers.Router($('body'));
    Backbone.history.start();
  }
};

$(document).ready(function(){
  NewsReader.initialize();
});
