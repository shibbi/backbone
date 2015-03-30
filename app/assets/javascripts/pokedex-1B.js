Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {
  var $div = $('<div/>', { class: "detail" });
  $div.html('<img src="' + pokemon.get('image_url') + '">');
  for(var prop in pokemon.attributes) {
    if (prop === 'image_url') {
      continue;
    }
    $div.append('<br/>' + prop + ': ' + pokemon.get(prop));
  }

  this.$pokeDetail.html($div);
};

Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
  var id = $(event.currentTarget).data('id');
  var pokemon = this.pokes.get(id);
  // debugger
  this.renderPokemonDetail(pokemon);
};
