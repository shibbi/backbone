TrelloClone.Views.BoardShow = Backbone.View.extend({
  template: JST['boards/show'],

  className: 'board-show',

  events: {
    'click .board-delete': 'deleteBoard',
    'click .list-delete': 'deleteList'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    $('head title').html(this.model.get('title') + ' | Trello Clone');
    $('body').addClass('board-show');

    var content = this.template({
      board: this.model
    });
    this.$el.html(content);

    return this;
  },

  deleteBoard: function (event) {
    var answer = confirm('Do you really want to delete board ' +
                         this.model.get('title') + '?');
    if (answer) {
      this.collection.remove(this.model);
      this.model.destroy();
      Backbone.history.navigate('', { trigger: true });
    }
  },

  deleteList: function (event) {
    var $target = $(event.currentTarget);
    var answer = confirm('Do you really want to delete list ' +
                         $target.data('title') + '?');
    if (answer) {
      var list = this.model.lists.get($target.data('id'));
      this.model.lists.remove(list);
      list.destroy();
      Backbone.history.navigate('#/boards/' + this.model.id,
                                { trigger: true });
    }
  }
});
