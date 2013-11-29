angular.module('ninjaApp.system').factory("Directory", ['$resource', function($resource) {
    return $resource('directory/:first/:last/:age');
}]);