(function(){
  "use strict";

  angular.module('public')
  .controller('NewsLetterController', NewsLetterController);

  NewsLetterController.$inject = ['MenuService'];

  function NewsLetterController(MenuService){
    var $ctrl = this;
    console.log("here");
    $ctrl.firstname = "";
    $ctrl.lastname = "";
    $ctrl.phone = "";
    $ctrl.email = "";
    $ctrl.preference = "";
    $ctrl.errorMessage = "";

    $ctrl.validatePreference = function(){
      console.log("call me");
      var promise = MenuService.getMenuItem($ctrl.preference);
      promise.then(function(response){
          $ctrl.menuItem = response;
          $ctrl.errorMessage = "";
          console.log("output",$ctrl.menuItem);
      })
      .catch(function(error){
        $ctrl.errorMessage = "No such menu number exists";
      });

    }

    $ctrl.saveInfo = function(){
      MenuService.saveUserInfo($ctrl.firstname, $ctrl.lastname, $ctrl.email, $ctrl.phone, $ctrl.preference)
      $ctrl.infoMessage = "Your information has been saved";
        // var promise = MenuService.saveUserInfo($ctrl.firstname, $ctrl.lastname, $ctrl.email, $ctrl.phone, $ctrl.preference);
        // promise.then(function(response){
        //   $ctrl.infoMessage = "Your information has been saved";
        // })
        // .catch(function(error){
        //   $ctrl.infoMessage = "";
        // });

    }
  }
})();
