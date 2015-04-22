TrelloClone.Views.NewBoard = Backbone.View.extend({
  template: JST['boards/new'],

  events: {
    'submit': 'submit'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    $('head title').html('New Board | Trello Clone');
    $('body').removeClass('board-show');

    var content = this.template({
      board: this.model
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
        this.collection.add(this.model, { merge: true });
        Backbone.history.navigate('#/boards/' + this.model.id,
                                  { trigger: true });
      }.bind(this),
      error: function (model, response) {
        this._errorMessages = response.responseJSON;
        this._errorMessages.forEach(function (error) {
          this.$('.errors').append('<li>' + error + '</li>');
        });
      }.bind(this)
    });
  }
});
