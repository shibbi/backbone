window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    TrelloClone.boards = new TrelloClone.Collections.Boards();
    TrelloClone.boards.fetch();
    debugger

    new TrelloClone.Routers.Router($('#main'));
    Backbone.history.start();
  }
};

$(document).ready(function(){
  TrelloClone.initialize();
});
