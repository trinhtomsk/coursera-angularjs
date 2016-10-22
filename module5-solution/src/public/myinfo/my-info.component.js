(function(){
  "use strict";

  angular.module('public')
  .component('myInfo', {
      templateUrl: 'src/public/myinfo/info.template.html',
      bindings: {
         userInfo: '<',
         menuItem: '<'
      }
  });

})();
