(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function() {
    angular.module('MainApp').controller('LoginController', LoginController);

    LoginController.$inject = ['$window'];
    function LoginController($window) {
        const LoginCtrl = this;

        const users = {
            "ALİ": 151534919,
            "VELİ": 265212492,
            "CEMİL": 2238882361,
            "AHMET": 1776192,
            "BÜLENT": 23465780,
            "TAHA": 20018153,
            "ŞAFAK": 15390083,
            "BERKAY": 7514340,
            "FATİH": 50521271,
            "MAHMUT": 2034510440,
            "CANLI": 2664817652
        };

        LoginCtrl.username = null;

        LoginCtrl.login = function () {
            if (LoginCtrl.username in users)
                window.location.replace("http://localhost:5500/#/event?username=" + LoginCtrl.username);
            else
                alert("Geçersiz Kullanıcı.");
        }
    };
}) ();
},{}],2:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('MainApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$window'];
    function RegisterController($window) {
        const RegisterCtrl = this;

        const keys = {
            "locale": ["id_ID", "en_US", "ka_GE", "es_LA", "fr_FR", "ar_AR", "en_GB", "pt_BR", "th_TH", "vi_VN"],
            "location": ["Medan Indonesia", "Stratford Ontario", "Tehran Iran", "Phnom Penh", "Djokja Yogyakarta Indonesia", "Triolet Mauritius", "Surabaya Indonesia", "Plaine Des Papayes Pamplemousses Mauritius", "Tbilisi Georgia", "Jombang Jawa Timur Indonesia"],
            "gender": ["Male", "Female"],
            "timezone": [0, 30, -30, 60, -60, 90, -90, 120, -120, 150]
        };

        RegisterCtrl.keys = keys;

        RegisterCtrl.disableButton = false;

        RegisterCtrl.userName = "";
        RegisterCtrl.locale = null;
        RegisterCtrl.birthyear = 2019;
        RegisterCtrl.gender = null;
        RegisterCtrl.registerDate = null;
        RegisterCtrl.location = null;
        RegisterCtrl.timezone = null;

        RegisterCtrl.checkBirthYear = function () {
            const currentYear = new Date().getFullYear();
            if (RegisterCtrl.birthyear >= currentYear) {
                RegisterCtrl.birthyear = 2000;
            }
        }

        RegisterCtrl.getResult = function () {
            RegisterCtrl.rentRange = null;
            RegisterCtrl.loader = true;
            RegisterCtrl.disableButton = true;

            RegisterCtrl.response = PredictService.getResult(RegisterCtrl.detail);
            RegisterCtrl.response.then(function (response) {
                RegisterCtrl.rentRange = response.data[0];
                $window.scrollTo(0, 0);
                RegisterCtrl.loader = false;
                RegisterCtrl.disableButton = false;
            }, function (response) {
                console.log(response.status);
                RegisterCtrl.loader = false;
                RegisterCtrl.disableButton = false;
            })
        }
    }
})()

},{}],3:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('MainApp')
        .controller('EventAttendController', EventAttendController);

    EventAttendController.$inject = ['$window'];
    function EventAttendController($window) {
        const EventCtrl = this;

        const keys = {
            "events": {
                "SPA": 1361307272,
                "HAVUZ": 955398943,
                "KAYAK": 1600413013,
                "BİNİCİLİK": 2877501688,
                "GOLF": 2529072432,
                "ATV TURU": 3583332424,
                "TELEFERİK": 907302600,
                "HAMAM": 507707719,
                "LUNAPARK": 1927775201,
                "BASKETBOL": 1532377761
            }
        };

        EventCtrl.keys = keys;

        EventCtrl.eventName = null;
        EventCtrl.userName = null;
        EventCtrl.startTime = null;
        EventCtrl.city = null;
        EventCtrl.state = null;
        EventCtrl.zip = null;
        EventCtrl.country = null;
        EventCtrl.lat = null;
        EventCtrl.long = null;
        EventCtrl.description = null;

        EventCtrl.checkStartTime = function () {
            const currentTime = new Date();
            if (EventCtrl.startTime < currentTime)
                EventCtrl.startTime = currentTime;
        }

        EventCtrl.getResult = function () {
            EventCtrl.rentRange = null;
            EventCtrl.loader = true;
            EventCtrl.disableButton = true;

            EventCtrl.response = PredictService.getResult(EventCtrl.detail);
            EventCtrl.response.then(function (response) {
                EventCtrl.rentRange = response.data[0];
                $window.scrollTo(0, 0);
                EventCtrl.loader = false;
                EventCtrl.disableButton = false;
            }, function (response) {
                console.log(response.status);
                EventCtrl.loader = false;
                EventCtrl.disableButton = false;
            })
        }

        $('#flatpickr').flatpickr({
            enableTime: true,
            dateFormat: "Y-m-d H:i",
            time_24hr: true,
            minDate: "today"
        });
    }

})()

},{}],4:[function(require,module,exports){
(function () {
    'use strict';
    
    angular.module('MainApp')
        .controller('EventPredictController', PredictController);

    PredictController.$inject = ['EventPredictService', '$window'];
    function PredictController(EventPredictService, $window) {
        const PredictCtrl = this;

        const events = {
            "SPA": 1361307272,
            "HAVUZ": 955398943,
            "KAYAK": 1600413013,
            "BİNİCİLİK": 2877501688,
            "GOLF": 2529072432,
            "ATV TURU": 3583332424,
            "TELEFERİK": 907302600,
            "HAMAM": 507707719,
            "LUNAPARK": 1927775201,
            "BASKETBOL": 1532377761
        };

        PredictCtrl.rentRange = null;
        PredictCtrl.loader = false;
        PredictCtrl.disableButton = false;


        PredictCtrl.detail = {
            invited: 1,
            userReco: 0,
            userPopularity: null,
            eventPopularity: null
        }

        // ***************************************************************************
        // EVENT NAME
        PredictCtrl.eventName = null;
        PredictCtrl.eventNameDetail = {};
        PredictCtrl.eventNameValue = {};

        for (let key in events)
            PredictCtrl.eventNameValue[key] = key;

        PredictCtrl.setEventNameValue = function () {
            for (let key in events) {
                PredictCtrl.eventNameDetail[key] = +(PredictCtrl.eventName === key);
            }
            //Object.assign(PredictCtrl.detail, PredictCtrl.eventNameDetail);
        }

        // ***************************************************************************
        // USER NAME
        var user = $.urlParam('username');
        PredictCtrl.username = user;

        PredictCtrl.getResult = function () {
            PredictCtrl.loader = true;
            PredictCtrl.disableButton = true;
            
            PredictCtrl.response = EventPredictService.getResult(PredictCtrl.detail);
            PredictCtrl.response.then(function (response) {
                PredictCtrl.prediction = response.data[0];

                $window.scrollTo(0, 0);
                PredictCtrl.loader = false;
                PredictCtrl.disableButton = false;
            }, function (response) {
                PredictCtrl.loader = false;
                PredictCtrl.disableButton = false;
            });
        };        
    };
})();

},{}],5:[function(require,module,exports){
(function () {
  'use strict';
  
  angular.module('MainApp')
  .service('EventPredictService', EventPredictService);

  EventPredictService.$inject = ['$http'];

  function EventPredictService ($http) {
    const PredictSrvc = this;

    PredictSrvc.baseUrl = 'http://localhost:5000/api';

    PredictSrvc.getResult = function (item, response) {
      return $http({
        method: 'POST',
        url: PredictSrvc.baseUrl + '/predict',
        data: item
      });
    };
  };
})();

},{}],6:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('MainApp')
        .controller('EventRegisterController', EventRegisterController);

    EventRegisterController.$inject = ['$window'];
    function EventRegisterController($window) {
        const EventCtrl = this;

        const keys = {
            "city": ["Sihanoukville", "Palo Alto", "New  York", "Chelsea", "Trenton", "Mobile", "Seattle", "Madison", "Washington", "Atlanta"],
            "state": ["Kampot", "CA", "NY", "MA", "ON", "AL", "WA", "WI", "DC", "GA"],
            "country": ["Cambodia", "United States", "Canada", "Pakistan", "Indonesia", "Mexico", "Spain", "Sweden", "Armenia", "Serbia"],
        };

        EventCtrl.keys = keys;

        EventCtrl.eventName = null;
        EventCtrl.userName = null;
        EventCtrl.startTime = null;
        EventCtrl.city = null;
        EventCtrl.state = null;
        EventCtrl.zip = null;
        EventCtrl.country = null;
        EventCtrl.lat = null;
        EventCtrl.long = null;
        EventCtrl.description = null;

        EventCtrl.checkStartTime = function () {
            const currentTime = new Date();
            if (EventCtrl.startTime < currentTime)
                EventCtrl.startTime = currentTime;
        }

        EventCtrl.getResult = function () {
            EventCtrl.rentRange = null;
            EventCtrl.loader = true;
            EventCtrl.disableButton = true;

            EventCtrl.response = PredictService.getResult(EventCtrl.detail);
            EventCtrl.response.then(function (response) {
                EventCtrl.rentRange = response.data[0];
                $window.scrollTo(0, 0);
                EventCtrl.loader = false;
                EventCtrl.disableButton = false;
            }, function (response) {
                console.log(response.status);
                EventCtrl.loader = false;
                EventCtrl.disableButton = false;
            })
        }

        $('#flatpickr').flatpickr({
            enableTime: true,
            dateFormat: "Y-m-d H:i",
            time_24hr: true,
            minDate: "today"
        });
    }

})()

},{}],7:[function(require,module,exports){
require('../Account/Login/LoginController');
require('../Account/Register/RegisterController');
require('../Event/Attend/EventAttendController');
require('../Event/Predict/EventPredictController');
require('../Event/Register/EventRegisterController');
},{"../Account/Login/LoginController":1,"../Account/Register/RegisterController":2,"../Event/Attend/EventAttendController":3,"../Event/Predict/EventPredictController":4,"../Event/Register/EventRegisterController":6}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
require('../Event/Predict/EventPredictService');
},{"../Event/Predict/EventPredictService":5}]},{},[8,9,7]);
