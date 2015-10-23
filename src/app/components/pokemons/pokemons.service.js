(function() {
	'use strict';

	angular
		.module('twitterApp')
		.factory('PokemonService', PokemonService);

	/** @ngInject */
	function PokemonService($http, $q) {
		var totalPokemons = 0,
			page = 0,
			pageSize = 10;

		function handleResponse(response) {
			return response.data;
		}

		function getPokemons() {
			return $http.get('http://pokeapi.co/api/v1/pokedex/1/')
				.then(handleResponse)
				.then(function(pokemon) {
					totalPokemons = pokemon.length;
				})
				.then(getMorePokemons);
		}

		function getPokemonImage(pokemon) {
			var uri = pokemon.sprites[0].resource_uri;
			return $http.get('http://pokeapi.co/' + uri)
				.then(handleResponse)
				.then(function(sprite) {
					pokemon.image = sprite.image;
					return pokemon;
				});
		}

		function getPokemon(id) {
			return $http.get('http://pokeapi.co/api/v1/pokemon/' + id )
				.then(handleResponse)
				.then(getPokemonImage);
		}

		function getMorePokemons() {
			var promises = [],
				length = page * pageSize + pageSize,
				i = 0;

			for(; i < length; i++) {
				promises.push(getPokemon(i + 1));
			}

			return $q.all(promises).then(function(response) {
				return response;
			});
		}

		return {
			getPokemons: getPokemons,
			getMorePokemons: getMorePokemons
		}
	}
}());