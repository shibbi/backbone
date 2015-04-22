JournalApp.Views.PostsIndex = Backbone.View.extend({
  template: JST['posts/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync remove', this.render);
  },

  render: function () {
    var $content = $(this.template());
    this.$el.html($content);

    this.collection.each(function (post) {
      var postItemView = new JournalApp.Views.PostsIndexItem({ model: post });
      this.$('ul').append(postItemView.render().$el);
    }.bind(this));

    return this;
  }
});
