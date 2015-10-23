(function () {
	'use strict';

	angular
		.module('twitterApp')
		.controller('MainController', MainController);

	/** @ngInject */
	function MainController($timeout, PokemonService) {
		var vm = this;

		vm.isLoading = false;
		vm.pokemons = [];
		vm.pokemonsDisplayed = 0;
		vm.limit = 10;
		vm.loadMore = loadMore;

		activate();

		function activate() {
			$timeout(function () {
				vm.classAnimation = 'rubberBand';
			}, 4000);
		}

		function loadMore() {
			vm.isLoading = true;
			PokemonService
				.getMorePokemons()
				.then(function(pokemons) {
					vm.pokemons = vm.pokemons.concat(pokemons);
				})
				.finally(function() {
					vm.isLoading = false;
				});
		}

		PokemonService
			.getPokemons()
			.then(function(pokemons) {
				vm.pokemons = pokemons;
			});


	}
})();
