NewsReader.Views.FeedIndexItem = Backbone.View.extend({
  template: JST["feeds/feed_index_item"],
  tagName: 'li',

  events: {
    "click button.favorite": "toggleFavoriteFeed",
    "click button.delete": "deleteFeed"
  },

  render: function () {
    var content = this.template({
      feed: this.model
    });

    this.$el.html(content);

    return this;
  },

  deleteFeed: function () {
    this.$el.remove();
    this.model.destroy({
      success: function () {
        this.collection.remove(this.model);
      }.bind(this)
    });
  },

  toggleFavoriteFeed: function(event) {
    var $currentTarget = $(event.currentTarget);
    var currentValue = $currentTarget.text();
    var toggle = (currentValue === "favorite") ? true : false;
    this.model.save({ favorite: toggle },{
      success: function () {
        this.render();
      }.bind(this)
    });
  }
});
