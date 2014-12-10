'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {templateUrl: 'partials/dashboard.html', controller: 'dashboard'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'login'});
	$routeProvider.when('/activate', {templateUrl: 'partials/activate.html', controller: 'activate'});
  $routeProvider.when('/advertise', {templateUrl: 'partials/advertise.html', controller: 'advertise'});
  $routeProvider.when('/category', {templateUrl: 'partials/category.html', controller: 'category'});
  $routeProvider.when('/help', {templateUrl: 'partials/help.html', controller: 'help'});
  $routeProvider.when('/points', {templateUrl: 'partials/points.html', controller: 'points'});
  $routeProvider.when('/revenue', {templateUrl: 'partials/revenue.html', controller: 'revenue'});
  $routeProvider.when('/password', {templateUrl: 'partials/password.html', controller: 'password'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
