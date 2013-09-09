'use strict';

scApp.directive('scSparkline', [function () {
  return {
    scope: {
      data: '='
    },
    link: function (scope, elm, attrs) {
      jQuery(elm).sparkline(scope.data, {
        type: 'bar',
        width: '100px',
        height: '30px',
        barColor: '#3498DB',
        negBarColor: '#3498DB',
        barWidth: 2,
        disableTooltips: true
      });
    }
  };
}]);