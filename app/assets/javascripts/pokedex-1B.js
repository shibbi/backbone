Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {
  var $div = $('<div/>', { class: "detail" });
  $div.html('<img src="' + pokemon.get('image_url') + '">');
  for(var prop in pokemon.attributes) {
    if (prop !== 'image_url') {
      $div.append('<br/>' + prop + ': ' + pokemon.get(prop));
    }
  }
  $div.append("<br/><strong>Toys:</strong>")
  var $ul = $("<ul/>");
  pokemon.fetch({
    success: function () {
      pokemon.toys().forEach(function(toy) {
        $ul.append(this.addToyToList(toy));
      }.bind(this));
    }.bind(this)
  });

  $div.append($ul);
  this.$pokeDetail.html($div);
};

Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
  var id = $(event.currentTarget).data('id');
  var pokemon = this.pokes.get(id);
  this.renderPokemonDetail(pokemon);
};
