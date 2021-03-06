Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {
  var $div = $('<div/>', { class: 'detail' });
  $div.append('<h3>' + pokemon.get('name') + '</h3>');
  $div.append('<img src="' + pokemon.get('image_url') + '">');
  var $info = $('<div/>', { class: 'pokemon-info' });
  $info.append('<strong>Attributes:</strong>');
  var $infoul = $('<ul/>');
  for(var prop in pokemon.attributes) {
    if (pokemon.get(prop) && prop !== 'image_url' && prop !== 'id') {
      $infoul.append('<li>' + prop + ': ' + pokemon.get(prop) + '</li>');
    }
  }
  $info.append($infoul);
  $div.append($info);

  var $toys = $("<div class='toys-container'><strong>Toys:</strong></div>");
  var $ul = $("<ul/>", { class: 'toys' });
  $toys.append($ul);
  $div.append($toys);
  this.$pokeDetail.html($div);

  pokemon.fetch({
    success: function () {
      this.renderToysList(pokemon.toys());
    }.bind(this)
  });
};

Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
  this.$toyDetail.empty();

  var id = $(event.currentTarget).data('id');
  var pokemon = this.pokes.get(id);

  this.renderPokemonDetail(pokemon);
};
