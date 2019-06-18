export default (app) => {

    app.controller('EventAttendController', EventAttendController);

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

        EventCtrl.submit = function () {
            EventCtrl.loader = true;
            EventCtrl.disableButton = true;

            console.log(EventCtrl.attend);
            console.log(EventCtrl.interest);
        };
    };
}