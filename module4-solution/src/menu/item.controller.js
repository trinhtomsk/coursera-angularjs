(function(){
  'use strict';

  angular.module('MenuApp')
  .controller('ItemDetailController',ItemDetailController);

  ItemDetailController.$inject = ['items']
  function ItemDetailController(items){
    var itemController = this;
    itemController.items = items;

  }
})();
