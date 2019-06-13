export default (app) => {

    app.controller('EventPredictController', PredictController);

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
};