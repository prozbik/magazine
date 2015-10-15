var app = angular.module('app', ["ui.router", "ui.bootstrap", "ngResource"]);
/* service block */
app.factory('GoodsFactory', ['$resource', function ($resource) {
  return $resource('/api/goods/:category/:id', {});
}]);
app.factory('BlogFactory', ['$resource', function ($resource) {
  return $resource('/api/blog/:id', {});
}]);

/* filter block */
app.filter('startFrom', function () {
  return function (data,start) {
    start = 0 + start;
    return data.slice(start);
  }
});

/* config block */
app.config(function ($stateProvider, $urlRouterProvider) {
  // for any unmatched url, redirect to /home
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/src/partials/home.tpl.html'
    })
    .state('blog', {
      url: '/blog',
      templateUrl: '/src/partials/blog.tpl.html',
      controller: 'BlogController'
    })
    .state('blog_single', {
      url: '/blog/:id',
      templateUrl: '/src/partials/blog_single.tpl.html',
      controller: 'BlogSingleController'
    })
    .state('cart', {
      url: '/cart',
      templateUrl: '/src/partials/cart.tpl.html',
      controller: 'ShopController'
    })
    .state('shop', {
      url: '/shop/:category',
      templateUrl: '/src/partials/shop.tpl.html',
      controller: 'ShopController'
    })
    .state('product-detail', {
      url: '/shop/:category/:id',
      templateUrl: '/src/partials/product_detail.tpl.html',
      controller: 'ShopSingleController'
    })
});

/* Controller block*/
app.controller('MainController', ['$scope','$http', 'BlogFactory', function ($scope, $http, BlogFactory) {
  $scope.menu = ['home', 'shop', 'blog'];
  $scope.categories = ['gloves', 'wallet', 'citybag', 'belts', 'backpack'];
  $scope.lastNews = BlogFactory.query();


}]);

app.controller('ShopController', ['$scope','GoodsFactory', function ($scope, GoodsFactory) {
  $scope.goods = [];
  $scope.pageSize = 6;
  $scope.currentPage = 1;
  $scope.maxSize = 5;
  $scope.color = '';

  $scope.goods = GoodsFactory.query();

$scope.checkProducts = function(goods){
  return goods = goods.length > 0 ? true : false;
}

}]);


app.controller('ShopSingleController', ['$scope','$stateParams', 'GoodsFactory', function ($scope, $stateParams, GoodsFactory) {
  $scope.product = GoodsFactory.get({category: $stateParams.category, id: $stateParams.id});
  console.log($scope.product);
}]);

app.controller('BlogController', ['$scope','BlogFactory', function ($scope,BlogFactory) {
  $scope.news = BlogFactory.query();
}]);
app.controller('BlogSingleController', ['$scope','BlogFactory', '$stateParams', function ($scope,BlogFactory, $stateParams) {
  $scope.article = BlogFactory.get({id: $stateParams.id });
}]);
