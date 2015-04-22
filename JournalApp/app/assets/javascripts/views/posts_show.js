JournalApp.Views.PostsShow = Backbone.View.extend({
  template: JST['posts/show'],

  events: {
    'click a': 'goBack',
    'dblclick .title': 'toggleTitle',
    'dblclick .body': 'toggleBody',
    'blur input': 'saveTitle',
    'blur textarea': 'saveBody'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ post: this.model });
    this.$el.html(content);
    
    return this;
  },

  goBack: function () {
    window.history.back();
  },

  toggleTitle: function (event) {
    var $target = $(event.currentTarget);
    $target.replaceWith('<input type="text" name="post[title]" value="' +
                                this.model.get('title') + '">');
  },

  toggleBody: function (event) {
    var $target = $(event.currentTarget);
    $target.replaceWith('<textarea name="post[body]">' +
                                   this.model.get('body') + '</textarea>');
  },

  saveTitle: function (event) {
    var $target = $(event.currentTarget);
    this.model.save({ title: $target.val() }, {
      success: function () {
        $target.replaceWith('<span class="title">' +
                                   this.model.get('title') + '</span>');
      }.bind(this)
    });
  },

  saveBody: function (event) {
    var $target = $(event.currentTarget);
    this.model.save({ body: $target.val() }, {
      success: function () {
        $target.replaceWith('<span class="body">' +
                                   this.model.get('body') + '</span>');
      }.bind(this)
    });
  }
});
