(function() {
  'use strict';

  angular
    .module('twitterApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
