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

        //EventCtrl.events = events;
        EventCtrl.users = users;

        EventCtrl.events = {};
        EventCtrl.form = {};
        EventCtrl.form.invited = {};

        EventCtrl.searchValue = "";
        EventCtrl.searchEvent = (combo) => {
            var result = {};
            angular.forEach(events, (value, key) => {
                if (combo && EventCtrl.searchValue == "")
                    return;
                if (value.includes(String(EventCtrl.searchValue).toUpperCase())) {
                    result[key] = value;
                }
            });
            return result;
        };

        EventCtrl.isAttending = (key) => {
            return EventCtrl.events[key] != undefined;
        };

        EventCtrl.attendEvent = (key) => {
            EventCtrl.events[key] = {
                name: events[EventCtrl.form.eventId],
                status: EventCtrl.form.opinion,
                interest: EventCtrl.form.interest == true ? "İlgili" : "İlgili Değil",
                invited: EventCtrl.form.invited,
            };

            // Clear form
            EventCtrl.form.event = null;
            EventCtrl.form.opinion = null;
            EventCtrl.form.interest = null;
            EventCtrl.form.invited = {};
        };
     
        EventCtrl.unattendEvent = (key) => {
            delete EventCtrl.events[key];
        };

        EventCtrl.showSearchResults = (array) => {
            if (Object.keys(array).length == 0)
                return false;
            else
                return true;
        };

        EventCtrl.invite = (userId) => {
            EventCtrl.form.invited[userId] = users[userId];
        };

        EventCtrl.uninvite = (userId) => {
            delete EventCtrl.form.invited[userId];
        };
        
        EventCtrl.isInvited = (userId) => {
            return EventCtrl.form.invited[userId] != undefined;
        };

        EventCtrl.submit = () => {
            EventCtrl.loader = true;
            EventCtrl.disableButton = true;

            console.log(EventCtrl.events);
        };
    };
}