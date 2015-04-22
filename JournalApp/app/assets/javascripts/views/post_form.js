JournalApp.Views.PostForm = Backbone.View.extend({
  template: JST['posts/post_form'],
  tagName: 'form',

  events: {
    'submit': 'submitForm'
  },

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      post: this.model,
      errors: this._errorMessages
    });
    this.$el.html(content);

    return this;
  },

  submitForm: function (event) {
    event.preventDefault();

    var $target = $(event.currentTarget);
    var post = $target.serializeJSON().post;

    this.model.save(post, {
      success: function () {
        this.collection.add(this.model, { merge: true });
        Backbone.history.navigate('', { trigger: true });
      }.bind(this),
      error: function (model, response) {
        this._errorMessages = response.responseText;
        this.render();
      }.bind(this)
    });
  }
});
