Pokedex.RootView.prototype.addPokemonToList = function (pokemon) {
  var $li = $(
    '<li class="poke-list-item" data-id="' + pokemon.get('id') + '">' +
      'Name: ' + pokemon.get('name') +
      '<br>Type: ' + pokemon.get('poke_type') +
    '</li>'
  );

  this.$pokeList.append($li);
};

Pokedex.RootView.prototype.refreshPokemon = function () {
  this.pokes.fetch({
    success: function(response) {
      response.each(function(pokemon) {
        var pokeModel = new Pokedex.Models.Pokemon(pokemon.attributes);
        this.pokes.add(pokeModel);
        this.addPokemonToList(pokeModel);
      }.bind(this));
    }.bind(this)
  });
};
