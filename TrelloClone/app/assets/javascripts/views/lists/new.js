TrelloClone.Views.NewList = Backbone.View.extend({
  template: JST['lists/new'],

  events: {
    'submit': 'submit'
  },

  initialize: function (options) {
    this.board = options.board;
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    $('head title').html('New List | Trello Clone');
    $('body').removeClass('board-show');

    var content = this.template({
      list: this.model
    });
    this.$el.html(content);

    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var $target = $(event.currentTarget);
    var data = $target.find('form').serializeJSON();
    this.model.save(data, {
      success: function () {
        this.board.lists.add(this.model);
        Backbone.history.navigate('#/boards/' + this.board.id,
                                  { trigger: true });
      }.bind(this),
      error: function (model, response) {
        this.$('.errors').empty();
        this._errorMessages = response.responseJSON;
        this._errorMessages.forEach(function (error) {
          this.$('.errors').append('<li>' + error + '</li>');
        });
      }.bind(this)
    });
  }
});
