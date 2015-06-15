console.log('im alive');

var donutApp = angular.module('donutApp', ['restangular', 'ui.grid']);

donutApp.controller('indexController', ['$scope', 'Restangular', function($scope, Restangular) {
  $scope.gridOptions = {
    columnDefs: [
      {
        name: 'title',
        type: 'string',
        cellTemplate: '<a href="{{row.entity.url}}">{{row.entity.title}}</a>'
      },
      {name: 'flavor', type: 'string'},
      {name: 'calories', type: 'number'},
      {name: 'brand', type: 'string'},
      {name: 'shape', type: 'string'},
      {name: 'country', type: 'string'}
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
