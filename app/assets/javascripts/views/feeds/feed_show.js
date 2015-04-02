NewsReader.Views.FeedShow = Backbone.View.extend({
  template: JST["feeds/feed_show"],

  events: {
    'click button': 'refreshFeed'
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    // call entry_show
    var content = this.template({
      feed: this.model
    });

    this.$el.html(content);

    this.model.entries().each( function(entry) {
      var entryView = new NewsReader.Views.EntryShow({
        model: entry
      });
      this.$('.entries').append(entryView.render().$el);
    }.bind(this));


    return this;
  },

  refreshFeed: function () {
    this.model.fetch();
  },

  addEntry: function () {

  },
});
