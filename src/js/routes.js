(function(){
    angular.module("MainApp").config(RoutesConfig);

    RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider","$locationProvider"];
    function RoutesConfig($stateProvider, $urlRouterProvider,$locationProvider) {
        // $locationProvider.html5Mode(true);
        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise("/");

        // *** Set up UI states ***
        $stateProvider
            //Predict Page

            // About Page
            .state("event", {
                url: "/event",
                templateUrl: "src/Event/Predict/event_predict.html",
                controller: "EventPredictController as PredictCtrl"
            })
            // Login Page
            .state("login", {
                url: "/login",
                templateUrl: "src/Account/Login/login.html",
                controller: "LoginController as LoginCtrl"
            })
            // Contact Page
            .state("register", {
                url: "/register",
                templateUrl: "src/Account/Register/register.html",
                controller: "RegisterController as RegisterCtrl"
            })
            // Create Event Page
            .state("createEvent", {
                url: "/createEvent",
                templateUrl: "src/Event/Register/register_event.html",
                controller: "EventRegisterController as EventCtrl"
            })
            // Attend Event Page
            .state("attendEvent", {
                url: "/attendEvent",
                templateUrl: "src/Event/Attend/event_attend.html",
                controller: "EventAttendController as EventCtrl"
            });
    };
}) ();