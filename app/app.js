var app = angular.module('app', ["ui.router", "ui.bootstrap", "ngResource"]);
/* service block */
app.factory('GoodsAPI', ['$resource', function ($resource) {
  return $resource('/src/models/goods.json', {});
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
    .state('about', {
      url: '/about',
      templateUrl: '/src/partials/about.tpl.html'
    })
    .state('contacts', {
      url: '/contacts',
      templateUrl: '/src/partials/contacts.tpl.html'
    })
    .state('shop', {
      url: '/shop/:category',
      templateUrl: '/src/partials/shop.tpl.html',
      controller: 'ShopController'
    })
    .state('single', {
      url: '/shop/product/:id',
      templateUrl: '/src/partials/single.tpl.html',
      controller: 'SingleController'
    })
});

/* Controller block*/
app.controller('MainController', ['$scope','$http', function ($scope, $http) {
  $scope.menu = ['home', 'about', 'shop', 'contacts'];
  $scope.categories = ['gloves', 'wallet', 'citybag', 'belts', 'backpack'];

}]);

app.controller('ShopController', ['$scope', '$http','GoodsAPI','$stateParams', function ($scope, $http, GoodsAPI, $stateParams) {
  $scope.goods = [];
  $scope.pageSize = 6;
  $scope.currentPage = 1;
  $scope.maxSize = 5;
  $scope.color = '';

  $scope.change = function (color) {
    var buffer = [];
    GoodsAPI.query({}, function (data) {
      data.filter(function (item) {
        if(item.color == color) {
           buffer.push(item);
        }
      })
    });
    $scope.goods = buffer;
  }
$scope.checkProducts = function(goods){
  return goods = goods.length > 0 ? true : false;
}

  if(_.size($stateParams.category) > 0) {
    var buffer = [];
    GoodsAPI.query({}, function (data) {
      data.filter(function (item) {
        if(item.category == $stateParams.category) {
           buffer.push(item);
        }
      })
    });
    $scope.goods = buffer;
  } else {
    GoodsAPI.query({}, function (data) {
      $scope.goods = data;
    });
  }

}]);


app.controller('SingleController', ['$scope','$http', '$stateParams', 'GoodsAPI', function ($scope, $http, $stateParams, GoodsAPI) {
  var id, buffer;
  id = $stateParams.id;
  buffer = [];
  $scope.goods = [];

  GoodsAPI.query({}, function (data) {
    data.filter(function (item) {
      if(item.id == id) {
         buffer.push(item);
      }
    })
  });
  $scope.goods = buffer;

  console.log($scope.goods);
}]);
