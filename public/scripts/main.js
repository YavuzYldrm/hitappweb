'use strict';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

import angular from 'angular';
import 'angular-route';
import 'angular-cookies';
import 'bootstrap';

import './layout';

import masterController from './controllers';
import masterService from './services';

var app = angular.module('MainApp', ["ngRoute", "ngCookies"]);

// Initialize controllers
masterController(app);

// Initialze services
masterService(app);

// Configure Routes
app.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
    $routeProvider
        .when("/", { redirectTo: "/home" })
        .when("/home", { templateUrl: "/templates/home.html" })
        .when("/login", { templateUrl: "/templates/Account/login.html", controller: "AccountLoginController as AccountCtrl" })
        .when("/register", { templateUrl: "/templates/Account/register.html", controller: "AccountRegisterController as AccountCtrl" })
        .when("/friends", { 
            templateUrl: "/templates/Account/friends.html", 
            controller: "AccountFriendsController as AccountCtrl",
            restrictions: {
                ensureAuthenticated: true,
                loginRedirect: true
            }
        })

        .when("/attend", { 
            templateUrl: "/templates/Event/attend.html", 
            controller: "EventAttendController as EventCtrl",
            restrictions: {
                ensureAuthenticated: true,
                loginRedirect: true
            }
        })
        .when("/create", 
        { 
            templateUrl: "/templates/Event/create.html", 
            controller: "EventCreateController as EventCtrl",
            restrictions: {
                ensureAuthenticated: true,
                loginRedirect: true
            } 
        })
        .when("/predict", 
        { 
            templateUrl: "/templates/Event/predict.html", 
            controller: "EventPredictController as EventCtrl"
        })
        .otherwise({ redirectTo: "/home" });
}]);

function routeStart($rootScope, $location, $route, $cookies) {
    $rootScope.$on('$routeChangeStart', (event, next, current) => {
        if (next.restrictions.ensureAuthenticated) {
            if (!$cookies.get('token')) {
                $location.path('/login');
            }
        }
        if (next.restrictions.loginRedirect) {
            if ($cookies.get('token')) {
                $location.path('/');
            }
        }
    });
}


app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.run(function ($rootScope, $window, $http, $cookies) {
    $rootScope.isAuthenticated = null;
    $rootScope.checkAuth = () => {
        var token = $cookies.get('token');
        if (!token) {
            $rootScope.isAuthenticated = false;
        }
        else {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            const url = 'http://127.0.0.1:5000/api/v1/authenticate';
            $http({
                method: 'GET',
                url: url
            }).then((response) => {
                $rootScope.isAuthenticated = true;
                return response.data.success;
            });
        }
    };
    $rootScope.logout = () => {
        $cookies.remove('token');
        $window.location.href = '/';
    };
});


$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
}