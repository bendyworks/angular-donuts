console.log('im alive');

var donutApp = angular.module('donutApp', ['restangular', 'ui.grid']);

// TODO specify injected objects so minification works
donutApp.controller('indexController', ['$scope', 'Restangular', function($scope, Restangular) {
  $scope.gridOptions = {
    columnDefs: [
      {name: 'title', cellTemplate: '<a href="{{row.entity.url}}">{{row.entity.title}}</a>'},
      {name: 'flavor'},
      {name: 'calories'},
      {name: 'brand'},
      {name: 'shape'},
      {name: 'country'}
    ],
    data: []
  };

  Restangular.all('donuts.json').getList().then(function(donuts) {
    $scope.gridOptions.data = _.map(donuts, function(i) {
      return {
        title: i.title,
        flavor: i.flavor,
        calories: i.calories,
        brand: i.brand,
        shape: i.shape,
        url: i.url,
        country: i.country
      };
    });
  });
}]);
