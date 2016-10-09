(function(){
  'use strict';

  angular.module('MenuApp')
  .component('itemList', {
    templateUrl: "src/templates/itemlist.template.html",
    bindings: {
      items: '<'
    }
  });
})();
