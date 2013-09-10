(function() {
  'use strict';

  scApp.controller('scTableController', ['$scope', function ($scope) {
  }]);

  scApp.controller('scGraphController', ['$scope', '$rootScope', '$filter', function ($scope, $rootScope, $filter) {
    $scope.selectedAll = false;
    $scope.filter = '';
    $scope.type = 'line';
    $scope.init = function () {
      $rootScope.rows = _.sortBy($rootScope.rows, function (r) {
        if (r.cCode === 'HIC' || r.cCode === 'LIC' || r.cCode === 'MIC' || r.cCode === 'UMC' || r.cCode === 'LMC') {
          r.selected = true;
        }
        return r.cName;
      });
      $scope.update();
    };
    
    $scope.updateAll = function () {
      var all = true;
      _.each($filter('countryFilter')($rootScope.rows,  $scope.filter), function (r) {
        if (!r.selected) {
          all = false;
        }
      });
      $scope.selectedAll = all;
    };
    
    $scope.update = function () {
      $scope.updateAll();
      
      var rows = _.filter($rootScope.rows, function (r) {
        return r.selected;
      });
      
      $('#chart').empty();
      if (rows.length === 0 ) {
        return;
      } 
      else if ($scope.type === 'line') {
        if (rows.length > 10) {
          $('#chart').append("<div id='sc-line-error'>10 countries maximum selected for line chart!</div>");
          $('#sc-line-error').css({'text-align' : 'center', 'padding-top': '150px'});
          return;
        }
        // update chart, i.e. http://www.highcharts.com/demo/area-stacked
        $('#chart').highcharts({
          chart: {
            type: 'area'
          },
          title: {
            text: 'Population Growth by Country'
          },
          xAxis: {
            categories: _.map(_.range(1960, 2010), function (d) {
              return d;
            }),
            labels: {
              formatter: function() {
                return  (this.value % 10 === 0) ? this.value : '';
              }
            },
          },
          yAxis: {
            title: {
              text: 'Population (Millions)'
            }
          },
          
          tooltip: {
            shared: true,
            valueSuffix: ' Million'
          },
          plotOptions: {
            area: {
              stacking: 'normal',
              lineColor: '#666666',
              lineWidth: 1,
              marker: {
                lineWidth: 1,
                lineColor: '#666666'
              }
            }
          },
          series: _.map(rows, function (r) {
            return {
              'name' : r.cName,
              'data' : r.yearSeries
            };
          }),
          credits: {
            enabled: false
          },
        });
      }
      else {
        $('#chart').highcharts({
          chart: {
            type: 'scatter',
            zoomType: 'xy'
          },
          title: {
            text: 'Population Size vs Growth by Country'
          },
          xAxis: {
            title: {
              enabled: true,
              text: 'Size (Millions)'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
          },
          yAxis: {
            title: {
              text: 'Growth Rate %'
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            scatter: {
              tooltip: {
                headerFormat: '<b></b>',
                pointFormat: '<b>{point.name}</b><br/>Size: {point.x} Million<br/>Growth: {point.y}%<br/>'
              }
            }
          },
          series: [{
            name : 'Population Size vs Growth',
            data : _.map(rows, function (r) {
              return {
                'name' : r.cName,
                'x' : r.yearSeries[r.yearSeries.length-1],
                'y' : r.growthRate
              };
            })
          }],
          credits: {
            enabled: false
          },
        });
      }
    };
    
    $scope.toggle = function () {
      _.each($filter('countryFilter')($rootScope.rows,  $scope.filter), function (r) {
        r.selected = $scope.selectedAll;
      });
      $scope.update();
    };
  }]);
}());