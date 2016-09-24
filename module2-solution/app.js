(function(){
  'use strict';

  var initialToBuyList = [
    {item_name: "cookies", item_quantity: 10},
    {item_name: "Chicken", item_quantity: 12},
    {item_name: "Milk", item_quantity: 2},
    {item_name: "Peanut Butter", item_quantity: 32},
    {item_name: "Donuts", item_quantity: 10}
  ]

  angular.module("ShoppingListCheckOff",[])
  .controller("ToBuyShoppingController", ToBuyShoppingController)
  .controller("AlreadyBoughtShoppingController",AlreadyBoughtShoppingController)
  .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

//inject the service to controller ToBuyShoppingController
  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyShoppingController(ShoppingListCheckOffService){
    var toBuy = this;

    toBuy.toBuyList = ShoppingListCheckOffService.getToBuyItems();
    //user clicks the buy button
    toBuy.boughtItem = function(itemIndex){
      ShoppingListCheckOffService.removeItem(itemIndex);
    };
  }
//inject the service to controller AlreadyBoughtShoppingController
  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService){
    var bought = this;
    bought.alreadyBoughtList = ShoppingListCheckOffService.getBoughtItems();
    // user clicks the remove button
    bought.removeItemFromList = function(itemIndex){
      ShoppingListCheckOffService.addBack(itemIndex);
    }
  }

  function ShoppingListCheckOffService(){
    var service = this;

    //list of to buy items
    var toBuyList = initialToBuyList;

    //list of bought items
    var boughtList = [];

    //put back the bought item to the buy list
    service.addBack = function(itemIndex){
      var item = {
        item_name: boughtList[itemIndex].item_name,
        item_quantity: boughtList[itemIndex].item_quantity
      };
      toBuyList.push(item);
      boughtList.splice(itemIndex,1);
    }

    // remove the item from buy list and add it to the bought list
    service.removeItem = function(itemIndex){
      var item = {
        item_name: toBuyList[itemIndex].item_name,
        item_quantity: toBuyList[itemIndex].item_quantity
      };
      boughtList.push(item);
      toBuyList.splice(itemIndex,1);
    };

    service.getBoughtItems = function(){
      return boughtList;
    };

    service.getToBuyItems = function(){
      return toBuyList;
    };

  }

})();
