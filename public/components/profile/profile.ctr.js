(function() {
  
  'use strict';
  
  angular
    .module('trailApp')
    .controller('profileController', profileController);
    
  function profileController($http) {
    
    var vm = this;
    
      vm.message = 'hello world';
  }
  
})();

