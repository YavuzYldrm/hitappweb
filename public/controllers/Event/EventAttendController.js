export default (app) => {
    app.controller('EventAttendController', EventAttendController);

    EventAttendController.$inject = ['$window'];
    function EventAttendController($window) {
        const EventCtrl = this;

        const events = {
            1361307272: "SPA",
            955398943: "HAVUZ",
            1600413013: "KAYAK",
            2877501688: "BİNİCİLİK",
            2529072432: "GOLF",
            3583332424: "ATV",
            907302600: "TELEFERİK",
            507707719: "HAMAM",
            1927775201: "LUNAPARK",
            1532377761: "BASKETBOL"
        };

        const users = {
            151534919: "ALİ",
            265212492: "VELİ",
            2238882361: "CEMİL",
            1776192: "AHMET",
            23465780: "BÜLENT",
            20018153: "TAHA",
            15390083: "ŞAFAK",
            7514340: "BERKAY",
            50521271: "FATİH",
            2034510440: "MAHMUT",
            2664817652: "CANLI"
        };

        const attendStatusOptions = {
            0: "No",
            1: "Maybe",
            2: "Yes"
        }

        EventCtrl.events = events;
        EventCtrl.users = users;
        EventCtrl.attendStatusOptions = attendStatusOptions;

        EventCtrl.attend = {};

        EventCtrl.searchValue = "";
        EventCtrl.searchEvent = () => {
            var result = {};
            angular.forEach(EventCtrl.events, (value, key) => {
                if (value.includes(EventCtrl.searchValue) || EventCtrl.searchValue == "") {
                    result[key] = value;
                }
            });
            return result;
        };

        EventCtrl.isAttending = (key) => {
            return EventCtrl.attend[key] != undefined;
        };

        EventCtrl.attendEvent = (key) => {
            EventCtrl.attend[key] = key;
            console.log(EventCtrl.attendDetailInvited[key]);
        };
        EventCtrl.unattendEvent = (key) => {
            delete EventCtrl.attend[key];
            delete EventCtrl.attendDetailInterest[key];
            delete EventCtrl.attendDetailStatus[key];
        };


        EventCtrl.submit = () => {
            EventCtrl.loader = true;
            EventCtrl.disableButton = true;

            console.log(EventCtrl.attend);
        };
    };
}