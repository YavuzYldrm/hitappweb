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
