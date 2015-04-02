NewsReader.Models.Entry = Backbone.Model.extend({
  // urlRoot: functionthis.feed.url() + '/entries',

  initialize: function (options) {
    this.feed = options.feed;
  }
});
