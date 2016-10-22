(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['userInfo','MenuService'];
function MyInfoController(userInfo,MenuService) {
  var $ctrl = this;
  $ctrl.userInfo = userInfo;
  if (userInfo !== undefined){
    var promise = MenuService.getMenuItem(userInfo.favoriteDish);
    promise.then(function(response){
        $ctrl.menuItem = response;
        console.log("output",$ctrl.menuItem);
    })
    .catch(function(error){
      $ctrl.errorMessage = "No such menu number exists";
    });
    console.log('menuItem', $ctrl.menuItem);
  }

}

})();
