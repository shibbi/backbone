JournalApp.Views.PostsIndexItem = Backbone.View.extend({
  template: JST['posts/index_item'],
  tagName: 'li',

  events: {
    'click button': 'deleteItem'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync destroy', this.render);
  },

  render: function () {
    var content = this.template({ post: this.model });
    this.$el.html(content);
    
    return this;
  },

  deleteItem: function () {
    this.remove();
    this.model.destroy();
  }
});
