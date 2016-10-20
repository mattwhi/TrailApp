var trailApp = angular.module('trailApp', ['auth0', 'angular-storage', 'angular-jwt', 'ngAria', 'ngAnimate', 'ngMaterial', 'ui.router', 'ngRoute', 'ngResource', 'ngMap', 'geocoder-service']);

//routes
trailApp.config(function ($provide, $routeProvider, authProvider, $urlRouterProvider, $httpProvider, $stateProvider, jwtInterceptorProvider) {
//    $authProvider.init({
//        domain: 'mattwhi.eu.auth0.com',
//        clientID: 'UQJaGn8oumO1whyftBTBaumkq0mpxTbW'
//    });
//    $urlRouterProvider.otherwise('/home');
    
//    $stateProvider
//        .state('home', {
//            url: '/home',
//            templateUrl: 'components/home/home.tpl.html'
//    })
//        .state('profile', {
//            url: '/profile',
//            templateUrl: 'components/profile/profile.tpl.html',
//            controller: 'profileController as user'
//    });
    
    $routeProvider
    
        .when('/', {
            templateUrl : 'templates/home.html',
            controller: 'trailAppController'
        })
        .when('/trailInfo/:id', {
            templateUrl : 'templates/trailInfo.html',
            controller : 'trailInfoController'
        });
});

//Services
trailApp.service('trailService', ['$http', function ($http) {
    return $http.get('data/trails.js')
        .success(function (data) {
            return data;
        
        })
        .error(function (data) {
            console.log(data);
        });
}]);

//controllers
trailApp.controller('trailAppController', ['$scope', '$resource', '$http', 'trailService','geocoderService', function ($scope, $resource, $http, trailService, geocoderService) {
    
    $scope.latitude = null;
    $scope.longitude = null;
    $scope.geocodeError = false;
    $scope.isFinished = false;
    $scope.address = '1600 Pennsylvania Avenue NW, Washington, D.C. 20500';

    geocoderService.getLatLong($scope.address).then(function (latlng) {
        $scope.latitude = latlng.lat();
        $scope.longitude = latlng.lng();
    }, function () {
        $scope.geocodeError = true;
    }).finally(function () {
    }).finally(function () {
        $scope.isFinished = true;
    });

    trailService.success(function (data) {
        $scope.trail = data.trails;
        $scope.searchTrails = "";
        console.log(trail)
    })
        .error(function (data) {
            console.log(data);
        });

}]);

trailApp.controller('trailInfoController', ['$scope', '$routeParams', '$resource', 'NgMap', 'trailService', function ($scope, $routeParams, $resource, NgMap, trailService) {
    NgMap.getMap().then(function (map) {
        NgMap.getMap().then(function (map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });
        trailService.success(function (data) {
            $scope.detail = data.trails[$routeParams.id];
        
            var city = $scope.detail.town + ",uk";
        
            $scope.trailWeather =  $resource('http://api.openweathermap.org/data/2.5/forecast?&appid=6b0e96b44e0bb881baa969aca8384d64', {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
    
            $scope.weatherResults = $scope.trailWeather.get({q: city, cnt: 1});
        
            $scope.convertToCelcius = function (degK) {
                return Math.round((degK - 273));
            };
        });
    });
}]);
