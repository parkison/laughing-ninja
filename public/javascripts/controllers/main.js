angular.module('ninjaApp.system')
  .controller('MainCtrl', ['$scope','Directory', function ($scope, Directory) {

    $scope.data = [];
    $scope.dirData = [];

    $scope.dirData = [{'first':'Mike','last':"Nash",'age':29},{'first':'Ben','last':"Parkison",'age':31}];

    $scope.filters = {first:"",last:""}
    $scope.getList = function() {
        var criteria = {};
        criteria.first = $scope.filters.first == "" ? "All" : $scope.filters.first;
        criteria.last  = $scope.filters.last  == "" ? "All" : $scope.filters.last;

        Directory.query(criteria)
          .$promise.then(
            function(data){
              $scope.dirData = data;
            },
            function(error){
              console.log('something went wrong! - no data loaded');
            });
    };

  }
]);
