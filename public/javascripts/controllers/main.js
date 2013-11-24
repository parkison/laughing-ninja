angular.module('ninjaApp.system')
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.data = {};

    $scope.data.five = 5;
  }
]);
