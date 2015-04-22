Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li": "selectPokemonFromList"
  },

  initialize: function () {
    if (!this.collection) {
      this.collection = new Pokedex.Collections.Pokemon();
    }
    this.listenTo(this.collection, 'sync', this.render);
  },

  addPokemonToList: function (pokemon) {
    var renderedContent = JST["pokemonListItem"]({ pokemon: pokemon });
    this.$el.append(renderedContent);
  },

  refreshPokemon: function (options) {
    this.collection.fetch({
      success: function () {
        this.render();
        options.callback && options.callback();
      }.bind(this)
    });
  },

  render: function () {
    this.$el.empty();
    this.collection.each(function(pokemon) {
      this.addPokemonToList(pokemon);
    }, this);
    return this;
  },

  selectPokemonFromList: function (event) {
    var $target = $(event.currentTarget);
    var pokeId = $target.data("id");
    Backbone.history.navigate("pokemon/" + pokeId, { trigger: true });
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
    "click .toys li": "selectToyFromList"
  },

  // initialize: function () {
  //   this.listenTo(this.model.toys(), 'sync', this.render);
  // },

  refreshPokemon: function (options) {
    this.model.fetch({
      success: function () {
        this.render();
          options.callback && options.callback();
      }.bind(this)
    });
  },

  render: function () {
    $(".toy-detail").empty();
    var pokeDetail = JST["pokemonDetail"]({ pokemon: this.model });
    this.$el.append(pokeDetail);
    this.model.toys().each(function (toy) {
      var toyListItem = JST["toyListItem"]({ toy: toy });
      $(".toys").append(toyListItem);
    }.bind(this));

    return this;
  },

  selectToyFromList: function (event) {
    var $target = $(event.currentTarget);
    var toyId = $target.data("id");
    var pokeId = $target.data("pokemon-id");
    Backbone.history.navigate("pokemon/" + pokeId + "/toys/" + toyId,
                              { trigger: true });
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  events: {
    "change select": "reassignToy"
  },

  render: function () {
    if (!this._pokeList) {
      this._pokeList = new Pokedex.Collections.Pokemon();
      this._pokeList.fetch({
        success: function () {
          this.render();
        }.bind(this)
      });
      return this;
    }
    var toyDetail = JST["toyDetail"]({ toy: this.model,
                                       pokes: this._pokeList });
    this.$el.html(toyDetail);
    return this;
  },

  reassignToy: function (event) {
    var $target = $(event.currentTarget);

    var pokemon = this._pokeList.get($target.data("pokemon-id"));
    // var toy = pokemon.toys().get($target.data("toy-id"));
    // toy.set("pokemon_id", $target.val());
    // toy.save({}, {
    //   success: function () {
    //     pokemon.toys().remove(toy);
    //     Backbone.history.navigate('pokemon/' + pokemon.id,
    //                               { trigger: true });
    //   }.bind(this)
    // });

    pokemon.fetch({
      success: function () {
        var toy = pokemon.toys().get($target.data("toy-id"));
        toy.set("pokemon_id", $target.val());
        toy.save({}, {
          success: function () {
            pokemon.toys().remove(toy);
            Backbone.history.navigate('pokemon/' + pokemon.id,
                                      { trigger: true });
          }.bind(this)
        });
      }.bind(this)
    });
  }
});
