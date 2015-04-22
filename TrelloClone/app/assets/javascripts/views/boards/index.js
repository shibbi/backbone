TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  template: JST['boards/index'],
  tagName: 'ul',

  initialize: function () {
    this.listenTo(this.collection, 'sync remove', this.render);
  },

  render: function () {
    $('head title').html('Trello Clone');
    $('body').removeClass('board-show');

    var content = this.template({
      boards: this.collection
    });
    this.$el.html(content);

    return this;
  }
});
