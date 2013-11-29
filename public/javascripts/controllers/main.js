angular.module('ninjaApp.system')
  .controller('MainCtrl', ['$scope','Directory', function ($scope, Directory) {

    $scope.data = [];
    $scope.dirData = [];

    $scope.filters = {first:"",last:"",age:""}
    $scope.getList = function() {
        var criteria = {};
        criteria.first = $scope.filters.first == "" ? "All" : $scope.filters.first;
        criteria.last  = $scope.filters.last  == "" ? "All" : $scope.filters.last;
        criteria.age  = $scope.filters.age  == "" ? "All" : $scope.filters.age;

        Directory.query(criteria)
          .$promise.then(
            function(data){
              $scope.dirData = data;
              for(var n=0;n<$scope.dirData.length;n++){
                $scope.dirData[n].fire = false;
              }
              console.log('Data returned from Mongo!');
            },
            function(error){
              console.log('something went wrong! - no data loaded');
            });
    };

    $scope.addEmployee = function() {
      var criteria = {};

      if($scope.newEmployee.first!="" && $scope.newEmployee.last!="" && $scope.newEmployee.age!=""){
        criteria.first = $scope.newEmployee.first;
        criteria.last = $scope.newEmployee.last;
        criteria.age = $scope.newEmployee.age;
        console.log(criteria)

        Directory.save(criteria)
          .$promise.then(
            function(){
              $scope.getList()
              console.log('Saved a new item!');
            },
            function(error){
              console.log('Save did not work');
            });
      }
    };

    $scope.$watch(function(){return d3.selectAll(".bar")[0][0]}, function(newVal, oldVal){
      console.log("Chart Change!")
    });

    //Inital Data Pull
    $scope.getList();

    $scope.changeValue = function(){
      $scope.dirData[0].age=40;
    }

  }
]);
