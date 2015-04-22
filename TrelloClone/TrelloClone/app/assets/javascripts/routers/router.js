TrelloClone.Routers.Router = Backbone.Router.extend({
  routes: {
    '': 'boardsIndex',
    'boards/new': 'newBoard',
    'boards/:id': 'boardShow',
    'boards/:board_id/lists/new': 'newList'
  },

  initialize: function ($el) {
    this.$rootEl = $el;
  },

  boardsIndex: function () {
    var indexView = new TrelloClone.Views.BoardsIndex({
      collection: TrelloClone.boards
    });
    this._swapView(indexView);
  },

  newBoard: function () {
    var board = new TrelloClone.Models.Board();
    var newBoardView = new TrelloClone.Views.NewBoard({
      model: board,
      collection: TrelloClone.boards
    });
    this._swapView(newBoardView);
  },

  boardShow: function (id) {
    var board = TrelloClone.boards.getOrFetch(id);
    var boardShowView = new TrelloClone.Views.BoardShow({
      model: board,
      collection: TrelloClone.boards
    });
    this._swapView(boardShowView);
  },

  newList: function (board_id) {
    var board = TrelloClone.boards.getOrFetch(board_id);
    var list = new TrelloClone.Models.List({ board_id: board_id });
    var newListView = new TrelloClone.Views.NewList({
      board: board,
      model: list
    });
    this._swapView(newListView);
  },

  _swapView: function (newView) {
    if (this._currentView) {
      this._currentView.remove();
    }
    this.$rootEl.html(newView.render().$el);
    this._currentView = newView;
  }
});
