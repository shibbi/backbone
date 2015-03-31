Pokedex.RootView.prototype.reassignToy = function (event) {
  var $select = $(event.currentTarget);

  var oldPokeId = $select.data('pokemon-id');
  var toyId = $select.data('toy-id');
  var newPokeId = $select.val();
  var oldPokemon = this.pokes.get(oldPokeId);
  var toy = oldPokemon.toys().get(toyId);

  toy.set('pokemon_id', newPokeId);
  toy.save({}, {
    success: function () {
      oldPokemon.toys().remove(toy);
      this.renderToysList(oldPokemon.toys());
      this.$toyDetail.empty();
    }.bind(this)
  });
};

Pokedex.RootView.prototype.renderToysList = function (toys) {
  this.$pokeDetail.find('.toys').empty();
  
  toys.forEach(function (toy) {
    this.addToyToList(toy);
  }.bind(this));
};
