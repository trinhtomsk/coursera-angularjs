(function(){
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems',FoundItems)
  .constant('MenuAPIPath',"https://davids-restaurant.herokuapp.com");


  function FoundItems() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true,
      transclude: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController(){
    var items = this;
  }

  NarrowItDownController.$inject = ['MenuSearchService','$scope'];
  function NarrowItDownController(MenuSearchService,$scope){
    var menu = this;

    menu.narrowItDown = function(searchTerm){
      //check if the searchTerm is not empty
      if (searchTerm !== undefined && searchTerm.length > 0) {

        var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

        promise.then(function(response){
          console.log(response.length);
          menu.found = response;
          if (!menu.found.length)
          menu.message = "Nothing found.";
          else
          menu.message = "";
          console.log(menu.message);
        }).catch(function(error){
          console.log(error);
        });

      } else {
        menu.found = null;
        menu.message = "Nothing found.";
      }
    }

    menu.removeItem = function (itemIndex) {
      console.log("removing",itemIndex);
      menu.found.splice(itemIndex,1);

    };

  }

  MenuSearchService.$inject = ['$http','MenuAPIPath'];
  function MenuSearchService($http, MenuAPIPath){
    var service = this;

    service.getMatchedMenuItems = function(searchTerm){
      return $http({
        method: "GET",
        url: (MenuAPIPath + "/menu_items.json")
      }).then(function(result){
        //process result and only keep items that match
        var foundItems = [];

        var menu_items = result.data.menu_items;
        for (var i=0;i<menu_items.length; i++){

          if (menu_items[i].description.indexOf(searchTerm) !== -1){
            var item = {
              name: menu_items[i].name,
              shortName: menu_items[i].short_name,
              description: menu_items[i].description
            }
            foundItems.push(item);
          }
        }
        return foundItems;
      });
    };
  }

})();
