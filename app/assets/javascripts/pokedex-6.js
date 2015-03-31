Pokedex.Router = Backbone.Router.extend({
  routes: {
    "": "pokemonIndex",
    "pokemon/:id": "pokemonDetail",
    "pokemon/:pokemonId/toys/:toyId": "toyDetail"
  },

  pokemonDetail: function (id, callback) {
    if (!this._pokemonIndex) {
      this.pokemonIndex(this.pokemonDetail.bind(this, id));
      return;
    }

    var pokemon = this._pokemonIndex.collection.get(id);
    this._pokemonDetail = new Pokedex.Views.PokemonDetail({ model: pokemon });
    this._pokemonDetail.refreshPokemon();
    $("#pokedex .pokemon-detail").html(this._pokemonDetail.$el);
  },

  pokemonIndex: function (callback) {
    this._pokemonIndex = new Pokedex.Views.PokemonIndex();
    this._pokemonIndex.refreshPokemon({ callback: callback });
    $("#pokedex .pokemon-list").html(this._pokemonIndex.$el);
  },

  toyDetail: function (pokemonId, toyId) {
    if (!this._pokemonDetail) {
      this.pokemonDetail(pokemonId,
                         this.toyDetail.bind(this, pokemonId, toyId));
      return;
    }

    var toy = this._pokemonDetail.model.toys().get(toyId);
    this._toyDetail = new Pokedex.Views.ToyDetail({ model: toy });
    $("#pokedex .toy-detail").html(this._toyDetail.render().$el);
  },

  pokemonForm: function () {
  }
});

$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
