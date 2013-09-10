
var scApp;
(function () {
  'use strict';
  scApp = angular.module('ScaligentApp', ['ui.router', 'ui.select2']);

  scApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/table');
    $stateProvider
      .state('table', {
        url : '/table',
        templateUrl : '/views/table.html',
        controller: 'scTableController'
      }).state('graph', {
        url : '/graph',
        templateUrl : '/views/graph.html',
        controller: 'scGraphController'
      });
  }]);

  scApp.run(['$rootScope', '$state', '$stateParams', '$location', '$http', function ($rootScope, $state, $stateParams, $location, $http) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.cols = [];
    $rootScope.rows = [];
    $rootScope.loading = true;
    $http.get('/world-pop.csv').then(function (rsp) {
      var data = rsp.data.split('\n');
      $rootScope.cols = data.shift().split(',');
      data.pop(); // last column is empty
      $rootScope.rows = _.map(data, function (c, id) {
        var cols = c.split(',');
        
        // create named data
        var o={};
        for (var i=0; i < $rootScope.cols.length; ++i) {
          o[$rootScope.cols[i]] = (i >= 2 ? parseFloat(cols[i]) || 0 : cols[i].trim() );
        }
        
        // create sparkline data
        var decadeData={};
        var yearSeries = [];
        var yearSeriesLog = [];
        for (var y=1960; y < 2010; ++y) {
          var decade = Math.floor(y /10)*10;
          var point = (o[y] === undefined ? 1 : o[y]) / 1000000;
          if (decadeData[decade] === undefined) {
            decadeData[decade]  = 0;
          }
          decadeData[decade] += point;
          yearSeries.push(point);
          yearSeriesLog.push(Math.log(1 + point));
        }
        
        var decadeSeries = _.map(_.sortBy(_.keys(decadeData)), function (d) {
          return Math.round(decadeData[d]);
        });
        
        // finish loading
        $rootScope.loading = false;
        
        var growthRate = parseFloat(((yearSeries[yearSeries.length-1] - yearSeries[0])/yearSeries[0])*100/yearSeries.length);
        if (growthRate === Infinity || isNaN(growthRate)) {
          growthRate = 0;
        }
        return {
          id : id,
          cName: o['Country Name'],
          cCode: o['Country Code'],
          namedData: o,
          decadeSeries: decadeSeries,
          yearSeries: yearSeries,
          yearSeriesLog: yearSeriesLog,
          growthRate: growthRate
        };
      });
    });
    
    $rootScope.sortAsc = true;
    // wierd bug with ng-show, try flags
    $rootScope.sortValName = false;
    $rootScope.sortValCurrent = false;
    $rootScope.sortValGrowth = false;
    // sort functions
    $rootScope.sortByName = function () {
      $rootScope.sortValName = true;
      $rootScope.sortValCurrent = false;
      $rootScope.sortValGrowth = false;
      $rootScope.sortAsc = !$rootScope.sortAsc;
      $rootScope.rows = _.sortBy($rootScope.rows, function (r) {
        return r.cName;
      });
      if (!$rootScope.sortAsc) {
        $rootScope.rows = $rootScope.rows.reverse();
      }
    };
    $rootScope.sortByCurrent = function () {
      $rootScope.sortValName = false;
      $rootScope.sortValCurrent = true;
      $rootScope.sortValGrowth = false;
      $rootScope.sortAsc = !$rootScope.sortAsc;
      $rootScope.rows = _.sortBy($rootScope.rows, function (r) {
        return r.yearSeries[r.yearSeries.length-1];
      });
      if (!$rootScope.sortAsc) {
        $rootScope.rows = $rootScope.rows.reverse();
      }
    };
    $rootScope.sortByGrowth = function () {
      $rootScope.sortValName = false;
      $rootScope.sortValCurrent = false;
      $rootScope.sortValGrowth = true;
      $rootScope.sortAsc = !$rootScope.sortAsc;
      $rootScope.rows = _.sortBy($rootScope.rows, function (r) {
        return r.growthRate;
      });
      if (!$rootScope.sortAsc) {
        $rootScope.rows = $rootScope.rows.reverse();
      }
    };
  }]);

  String.prototype.trim = function() {
    return String(this).replace(/^[\s"']+|[\s"']+$/g, '');
  };
}());