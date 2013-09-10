(function() {
  'use strict';

  scApp.filter('last', function() {
    return function(series) {
      return series[series.length-1];
    };
  });

  scApp.filter('range', ['$rootScope', function($rootScope) {
    return function (series) {
      return _.range(0, Math.ceil(series.length / $rootScope.pageSize));
    };
  }]);

  scApp.filter('countryFilter', function() {
    return function (series, name) {
      return _.filter(series, function (r) {
        if (name === undefined || name.length === 0) {
          return true;
        }
        return r.cName.toLowerCase().indexOf(name.toLowerCase()) >= 0;
      });
    };
  });
}());