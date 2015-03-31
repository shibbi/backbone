Pokedex.RootView.prototype.addPokemonToList = function (pokemon) {
  var $li = $('<li class="poke-list-item">');
  $li.data('id', pokemon.get('id'));

  $li.append('Name :' + pokemon.get('name') + '<br/>');
  $li.append('Type :' + pokemon.get('poke_type') + '<br/>');

  this.$pokeList.append($li);
};

Pokedex.RootView.prototype.refreshPokemon = function () {
  this.pokes.fetch({
    success: function() {
      this.$pokeList.empty();
      this.pokes.each(this.addPokemonToList.bind(this));
    }.bind(this)
  });

  return this.pokes;
};
