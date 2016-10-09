(function(){
  angular.module('MenuApp')
  .config(RoutersConfig);

  RoutersConfig.$inject = ['$stateProvider','$urlRouterProvider'];

  function RoutersConfig($stateProvider, $urlRouterProvider){

    //redirect to home if no other url maches
    $urlRouterProvider.otherwise('/');

    //set up UI states
    $stateProvider
    .state('home',{
      url: '/',
      templateUrl: 'src/templates/home.template.html'
    })
    .state('categories',{
      url: '/categories',
      templateUrl: 'src/templates/categories.template.html',
      controller: 'MenuAppController as menuController',
      resolve: {
        menus: ['MenuDataService', function(MenuDataService){
          return MenuDataService.getAllCategories();
        }]
      }
    })
    .state('categories.categoryDetail',{
      url: '/category-detail/{category}',
      templateUrl: 'src/templates/items.template.html',
      controller: 'ItemDetailController as itemController',
      resolve: {
        items: ['$stateParams','MenuDataService', function($stateParams, MenuDataService){
          return MenuDataService.getItemsForCategory($stateParams.category);
        }]
      }
    });

  }
})();
