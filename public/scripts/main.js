'use strict';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

import angular from 'angular';
import 'angular-route';
import 'bootstrap';

import masterController from './controllers';
import masterService from './services';

var app = angular.module('MainApp', ["ngRoute"]);

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
        .when("/friends", { templateUrl: "/templates/Account/friends.html", controller: "AccountFriendsController as AccountCtrl" })

        .when("/attend", { templateUrl: "/templates/Event/attend.html", controller: "EventAttendController as EventCtrl" })
        .when("/create", { templateUrl: "/templates/Event/create.html", controller: "EventCreateController as EventCtrl" })
        .when("/predict", { templateUrl: "/templates/Event/predict.html", controller: "EventPredictController as EventCtrl" })
        .otherwise({ redirectTo: "/home" });
}]);

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
}