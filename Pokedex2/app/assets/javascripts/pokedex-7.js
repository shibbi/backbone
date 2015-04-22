Pokedex.Views = (Pokedex.Views || {});

Pokedex.Views.PokemonForm = Backbone.View.extend({
  events: {
    "submit form": "savePokemon"
  },

  render: function () {
    var pokeForm = JST["pokemonForm"]({ pokemon: this.model });
    this.$el.append(pokeForm);
    return this;
  },

  savePokemon: function (event) {
    event.preventDefault();

    var $target = $(event.currentTarget);
    var pokemon = $target.serializeJSON()['pokemon'];
    this.model.set(pokemon);
    this.model.save({}, {
      success: function (response) {
        this.collection.add(this.model);
        Backbone.history.navigate('pokemon/' + response.id, { trigger: true });
      }.bind(this)
    });
  }
});
