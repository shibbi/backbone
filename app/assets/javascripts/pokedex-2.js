Pokedex.RootView.prototype.addToyToList = function (toy) {
  var $li = $(
    '<li ' +
      'data-toy-id="' + toy.get('id') + '" ' +
      'data-pokemon-id="' + toy.get('pokemon_id') + '">' +
      'Name: ' + toy.get('name') + '<br/>' +
      'Happiness: ' + toy.get('happiness') + '<br/>' +
      'Price: ' + toy.get('price') +
    '</li>'
  );
  this.$pokeDetail.find('ul.toys').append($li);
};

Pokedex.RootView.prototype.renderToyDetail = function (toy) {
  var $div = $('<div/>', { class: "detail" });
  $div.html('<img src="' + toy.get('image_url') + '">');
  for(var prop in toy.attributes) {
    if (prop !== 'image_url') {
      $div.append('<br/>' + prop + ': ' + toy.get(prop));
    }
  }
  $div.append("<br/><strong>Pokemon:</strong>");
  var $select = $('<select/>', {
    'data-pokemon-id': toy.get('pokemon_id'),
    'data-toy-id': toy.get('id')
  });
  this.pokes.forEach(function (pokemon) {
    var option = $('<option/>', {
      value: pokemon.get('id'),
      text: pokemon.get('name')
    });
    $select.append(option);
  });
  $div.append($select);
  this.$toyDetail.html($div);
};

Pokedex.RootView.prototype.selectToyFromList = function (event) {
  var toyId = $(event.currentTarget).data('toy-id');
  var pokemonId = $(event.currentTarget).data('pokemon-id');
  var pokemon = this.pokes.get(pokemonId);
  var toy = pokemon.toys().get(toyId);
  this.renderToyDetail(toy);
};
