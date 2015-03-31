Pokedex.RootView.prototype.addToyToList = function (toy) {
  var renderedContent = JST['toyListItem']({ toy: toy });
  this.$pokeDetail.find(".toys").append(renderedContent);
};

Pokedex.RootView.prototype.renderToyDetail = function (toy) { // III
  this.$toyDetail.empty();

  var renderedContent = JST['toyDetail']({ toy: toy, pokes: this.pokes });
  this.$toyDetail.html(renderedContent);
};

Pokedex.RootView.prototype.selectToyFromList = function (event) {
  var $target = $(event.target);

  var toyId = $target.data('id');
  var pokemonId = $target.data('pokemon-id');

  var pokemon = this.pokes.get(pokemonId);
  var toy = pokemon.toys().get(toyId);

  this.renderToyDetail(toy);
};
