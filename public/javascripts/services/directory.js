angular.module('ninjaApp.system').factory("Directory", ['$resource', function($resource) {
    return $resource('directory/:first/:last', {
        // city: '@collection'
        // city: '@city'
        // city: 'New York'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);