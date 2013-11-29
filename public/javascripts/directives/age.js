angular.module('ninjaApp.system')
  .directive('ageChart', function () {
    var agechart = charts.agechart();
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="agechart"></div>',
      scope: {
        data: '=dirData'
      },
      link: function (scope, element, attrs) {
        //we select the element of this directive
        var div = d3.select(element[0]);


        //we update the chart when the data get's updated
        scope.$watch('data', function(newVal, oldVal) {
          if(newVal) div.datum(newVal).call(agechart);
        }, true);
      }
    };
 })
