(function(){
  'use strict';

  angular.module('MenuData')
  .service('MenuDataService',MenuDataService);

  MenuDataService.$inject = ['$http','MenuDataAPIPath'];
  function MenuDataService($http, MenuDataAPIPath){
    var service = this;
    var menus = [];
    var items = [];
    service.getAllCategories = function(){

        return $http({
          method: "GET",
          url: (MenuDataAPIPath + "/categories.json")
        }).then(function(result){
          console.log("categories:",result.data);
          return menus = result.data;
        });
    };

    service.getItemsForCategory = function(categoryShortName) {
        return $http({
          method: "GET",
          url: (MenuDataAPIPath + "/menu_items.json?category=" + categoryShortName)
        }).then(function(result){
          console.log("menu_items:",result.data.menu_items);
          return items = result.data.menu_items;
        });
    };


    // service.getMatchedMenuItems = function(searchTerm){
    //   return $http({
    //     method: "GET",
    //     url: (MenuDataAPIPath + "/menu_items.json")
    //   }).then(function(result){
    //     //process result and only keep items that match
    //     var foundItems = [];
    //
    //     var menu_items = result.data.menu_items;
    //     for (var i=0;i<menu_items.length; i++){
    //
    //       if (menu_items[i].description.indexOf(searchTerm) !== -1){
    //         var item = {
    //           name: menu_items[i].name,
    //           shortName: menu_items[i].short_name,
    //           description: menu_items[i].description
    //         }
    //         foundItems.push(item);
    //       }
    //     }
    //     return foundItems;
    //   });
    // };
  }

})();
