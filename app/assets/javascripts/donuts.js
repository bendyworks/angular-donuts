console.log('im alive');

var donutApp = angular.module('donutApp', ['restangular',
                                           'ui.grid',
                                           'ui.grid.edit',
                                           'ngModal',
                                           'ng-rails-csrf']);

donutApp.controller('indexController', ['$scope', 'Restangular', 'uiGridConstants',
  function($scope, Restangular, uiGridConstants) {
    Restangular.setRequestSuffix('.json');
    $scope.dialogShown = false;

    $scope.update = function(donut) {
      Restangular.all('donuts').post(donut).then(function(d) {
        $scope.gridOptions.data.push({
          title: d.title,
          flavor: d.flavor,
          calories: d.calories,
          brand: d.brand,
          shape: d.shape,
          url: 'donuts/' + d.id,
          country: d.country,
          resource: d
        });
        $scope.dialogShown = false;
      });
    };

    $scope.reset = function() {
      $scope.donut = angular.copy({});
    };

    $scope.reset();

    $scope.gridOptions = {
      enableFiltering: true,
      columnDefs: [
        {
          name: 'title',
          type: 'string',
          cellTemplate: '<a href="{{row.entity.url}}">{{row.entity.title}}</a>'
        },
        {
          name: 'flavor',
          type: 'string',
          enableCellEdit: true
        },
        {
          name: 'calories',
          type: 'number',
          enableCellEdit: true,
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
        {
          name: 'shape',
          type: 'string',
          editableCellTemplate: 'ui-grid/dropdownEditor',
          editDropdownValueLabel: 'shape',
          editDropdownOptionsArray: [
          {id: 'donut', shape: 'donut'},
          {id: 'filled', shape: 'filled'},
          {id: 'hole', shape: 'hole'},
          {id: 'fritter', shape: 'fritter'}]
        },
        {name: 'country', type: 'string'}
      ],
      data: []
    };

    $scope.gridOptions.onRegisterApi = function(gridApi) {
      $scope.gridApi = gridApi;
      gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
        rowEntity.resource[colDef.name] = rowEntity[colDef.name];
        rowEntity.resource.put();
      });
    };

    $scope.toggleDialog = function() {
      $scope.dialogShown = !$scope.dialogShown;
    };

    Restangular.all('donuts').getList().then(function(donuts) {
      $scope.gridOptions.data = _.map(donuts, function(d) {
        var resourceUrl = function(u) { return (u || '').replace(/\.json$/, ''); };

        return {
          title: d.title,
          flavor: d.flavor,
          calories: d.calories,
          brand: d.brand,
          shape: d.shape,
          url: resourceUrl(d.url),
          country: d.country,
          resource: d
        };
      });
    });
  }
]);
