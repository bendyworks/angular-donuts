console.log('im alive');

var donutApp = angular.module('donutApp', ['restangular', 'ui.grid']);

donutApp.controller('indexController', ['$scope', 'Restangular', 'uiGridConstants',
  function($scope, Restangular, uiGridConstants) {
    $scope.gridOptions = {
      enableFiltering: true,
      columnDefs: [
        {
          name: 'title',
          type: 'string',
          cellTemplate: '<a href="{{row.entity.url}}">{{row.entity.title}}</a>'
        },
        {name: 'flavor', type: 'string'},
        {
          name: 'calories',
          type: 'number',
          filters: [
            {
              condition: uiGridConstants.filter.GREATER_THAN,
              placeholder: 'Greater Than'
            },
            {
              condition: uiGridConstants.filter.LESS_THAN,
              placeholder: 'Lesser Than'
            }
          ],
        },
        {name: 'brand', type: 'string'},
        {name: 'shape', type: 'string'},
        {name: 'country', type: 'string'}
      ],
      data: []
    };

    Restangular.all('donuts.json').getList().then(function(donuts) {
      $scope.gridOptions.data = _.map(donuts, function(i) {
        var resourceUrl = function(u) { (u || '').replace(/\.json$/, ''); };

        return {
          title: i.title,
          flavor: i.flavor,
          calories: i.calories,
          brand: i.brand,
          shape: i.shape,
          url: resourceUrl(i.url),
          country: i.country
        };
      });
    });
  }
]);
