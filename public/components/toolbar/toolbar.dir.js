(function() {
    
    'use strict';
    
    angular.module('trailApp').directive('toolbar', toolbar);
    
    function toolbar() {
        return {
            templateUrl: 'components/toolbar/toolbar.tpl.html',
            controller: toolbarController,
            controllerAs: 'toolbar'
        };
    }
    
    function toolbarController() {
    
    }   
})();