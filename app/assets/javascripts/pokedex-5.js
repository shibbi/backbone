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
      }.bind(this)
    })
  },

  render: function () {
    this.$el.empty();
    this.collection.each(function(pokemon) {
      this.addPokemonToList(pokemon);
    }, this);
    return this;
  },

  selectPokemonFromList: function (event) {
    var $target = $(event.currentTarget);
    var pokemon = this.collection.get($target.data("id"));
    var pokemonDetail = new Pokedex.Views.PokemonDetail({ model: pokemon });
    pokemonDetail.refreshPokemon();
    $("#pokedex .pokemon-detail").html(pokemonDetail.$el);
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
    var toy = this.model.toys().get($target.data("id"));
    var toyDetail = new Pokedex.Views.ToyDetail({ model: toy });
    // pokemonDetail.refreshPokemon();
    $("#pokedex .toy-detail").html(toyDetail.render().$el);
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
    var toyDetail = JST["toyDetail"]({ toy: this.model, pokes: _([]) });
    this.$el.append(toyDetail);
    return this;
  }
});

$(function () {
  var pokemonIndex = new Pokedex.Views.PokemonIndex();
  pokemonIndex.refreshPokemon();
  $("#pokedex .pokemon-list").html(pokemonIndex.$el);
});
