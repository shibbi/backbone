window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    alert('HELLO FROM BACKBONE!');
    Backbone.history.start();
  }
};

$(document).ready(function(){
  TrelloClone.initialize();
});
