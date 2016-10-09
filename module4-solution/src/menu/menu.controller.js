(function(){
  'use strict';

  angular.module('MenuApp')
  .controller('MenuAppController',MenuAppController);

  MenuAppController.$inject = ['menus']
  function MenuAppController(menus){
    var menuController = this;

    menuController.menus = menus;

  }
})();
