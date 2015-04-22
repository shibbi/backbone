TrelloClone.Models.Board = Backbone.Model.extend({
  urlRoot: '/api/boards',

  initialize: function () {
    this.lists = new TrelloClone.Collections.Lists();
  },

  parse: function (response) {
    if (response.lists) {
      debugger
      this.lists.set(response.lists);
      delete response.lists;
    }

    return response;
  }
});
