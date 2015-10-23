(function() {
  'use strict';

  angular
    .module('pokemonApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
