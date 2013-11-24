//Setting up route
window.app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);
