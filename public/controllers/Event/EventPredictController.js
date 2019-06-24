export default (app) => {
    app.controller('EventPredictController', PredictController);

    PredictController.$inject = ['EventPredictService', '$window'];
    function PredictController(EventPredictService, $window) {
        const EventCtrl = this;

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

        EventCtrl.rentRange = null;
        EventCtrl.loader = false;
        EventCtrl.disableButton = false;


        EventCtrl.detail = {
            invited: 1,
            userReco: 0,
            userPopularity: null,
            eventPopularity: null
        }

        // ***************************************************************************
        // EVENT NAME
        EventCtrl.eventName = null;
        EventCtrl.eventNameDetail = {};
        EventCtrl.eventNameValue = {};

        for (let key in events)
            EventCtrl.eventNameValue[key] = key;

        EventCtrl.setEventNameValue = function () {
            for (let key in events) {
                EventCtrl.eventNameDetail[key] = +(EventCtrl.eventName === key);
            }
            //Object.assign(EventCtrl.detail, EventCtrl.eventNameDetail);
        }

        // ***************************************************************************

        EventCtrl.getResult = function () {
            EventCtrl.loader = true;
            EventCtrl.disableButton = true;
            EventCtrl.showResult = false;

            EventCtrl.response = EventPredictService.getResult(EventCtrl.detail);
            EventCtrl.response.then(function (response) {
                console.log(response.data.data);
                EventCtrl.prediction = response.data.data;
                $window.scrollTo(0, 0);
                EventCtrl.loader = false;
                EventCtrl.disableButton = false;
                EventCtrl.showResult = true;
            }, function (response) {
                console.log('2nd');
                console.log(response);
                EventCtrl.prediction = response.data.data;
                EventCtrl.loader = false;
                EventCtrl.disableButton = false;
                EventCtrl.showResult = false;
            });
        };
    };
};