import flatpickr from "flatpickr";

export default (app) => {

    app.controller('EventRegisterController', EventRegisterController);

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
        $(document).ready(function ($) {
            $('#flatpickr').flatpickr({
                enableTime: true,
                dateFormat: "Y-m-d H:i",
                time_24hr: true,
                minDate: "today"
            });
        });
    }

};