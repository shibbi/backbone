Pokedex.RootView.prototype.createPokemon = function (attrs, callback) {
  var pokemon = new Pokedex.Models.Pokemon(attrs);

  pokemon.save({}, {
    success: function () {
      this.pokes.add(pokemon);
      this.addPokemonToList(pokemon);
      callback && callback.call(this, pokemon);
    }.bind(this)
  });

  return pokemon;
};

Pokedex.RootView.prototype.submitPokemonForm = function (event) {
  event.preventDefault();

  var $submit = $(event.currentTarget);
  var pokemonJSON = $submit.serializeJSON().pokemon;
  
  this.createPokemon(pokemonJSON, this.renderPokemonDetail.bind(this));
};
