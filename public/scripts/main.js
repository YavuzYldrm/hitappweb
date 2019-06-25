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

app.value('loginRedirectUrl', '/');

// Configure Routes
app.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
    $routeProvider
        .when("/", { templateUrl: "/templates/home.html" })
        .when("/login", { templateUrl: "/templates/Account/login.html", controller: "AccountLoginController as AccountCtrl" })
        .when("/register", { templateUrl: "/templates/Account/register.html", controller: "AccountRegisterController as AccountCtrl" })
        .when("/friends", {
            templateUrl: "/templates/Account/friends.html",
            controller: "AccountFriendsController as AccountCtrl",
            needAuthentication: true
        })

        .when("/attend", {
            templateUrl: "/templates/Event/attend.html",
            controller: "EventAttendController as EventCtrl",
            needAuthentication: true
        })
        .when("/create",
            {
                templateUrl: "/templates/Event/create.html",
                controller: "EventCreateController as EventCtrl",
                needAuthentication: true
            })
        .when("/predict",
            {
                templateUrl: "/templates/Event/predict.html",
                controller: "EventPredictController as EventCtrl",
                needAuthentication: true
            })
        .otherwise({ redirectTo: "/" });
}])

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.run(function ($rootScope, $window, $location, $http, $cookies, $route, loginRedirectUrl) {
    $rootScope.isAuthenticated = null;
    $rootScope.checkAuth = () => {
        var token = $cookies.get('token');
        if (!token) {
            $rootScope.isAuthenticated = false;
        }
        else {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            const url = 'http://192.168.5.55:5000/api/v1/authenticate';
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
        var token = $cookies.get('token');
        $window.location.href = '/';
    };

    $rootScope.$on('$routeChangeStart', (event, next, current) => {
        var referrer = next.$$route.originalPath;
        if (next.needAuthentication && referrer != '/login') {
            if (!$cookies.get('token')) {
                // Save referrer
                // loginRedirectUrl = referrer;
                $rootScope.url = referrer;
                console.log('Referrer:' + loginRedirectUrl);

                // Redirect to login page.
                $location.path('/login');
            }
        }
    });
});


$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
}