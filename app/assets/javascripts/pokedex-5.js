Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li": "selectPokemonFromList"
  },

  initialize: function () {
    if (!this.collection) {
      this.collection = new Pokedex.Collections.Pokemon();
    }
  },

  addPokemonToList: function (pokemon) {
    var renderedContent = JST["pokemonListItem"]({ pokemon: pokemon });
    this.$el.append(renderedContent);
  },

  refreshPokemon: function (options) {
    this.collection.fetch({
      success: function () {
        this.render();
        options.callback && options.callback();
      }.bind(this)
    });
  },

  render: function () {
    this.$el.empty();
    this.collection.each(function(pokemon) {
      this.addPokemonToList(pokemon);
    }, this);
    // debugger;
    return this;
  },

  selectPokemonFromList: function (event) {
    var $target = $(event.currentTarget);
    var pokeId = $target.data("id");
    Backbone.history.navigate("pokemon/" + pokeId, { trigger: true });
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
    "click .toys li": "selectToyFromList"
  },

  refreshPokemon: function (options) {
    this.model.fetch({
      success: function () {
        this.render();
      }.bind(this)
    });
  },

  render: function () {
    var pokeDetail = JST["pokemonDetail"]({ pokemon: this.model });
    this.$el.append(pokeDetail);
    this.model.toys().each(function (toy) {
      var toyListItem = JST["toyListItem"]({ toy: toy });
      $(".toys").append(toyListItem);
    }.bind(this));
    return this;
  },

  selectToyFromList: function (event) {
    var $target = $(event.currentTarget);
    var toyId = $target.data("id");
    var pokeId = $target.data("pokemon-id");
    Backbone.history.navigate("pokemon/" + pokeId + "/toys/" + toyId,
                              { trigger: true });
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
    var toyDetail = JST["toyDetail"]({ toy: this.model, pokes: _([]) });
    this.$el.append(toyDetail);
    return this;
  }
});

// $(function () {
//   var pokemonIndex = new Pokedex.Views.PokemonIndex();
//   pokemonIndex.refreshPokemon();
//   $("#pokedex .pokemon-list").html(pokemonIndex.$el);
// });
