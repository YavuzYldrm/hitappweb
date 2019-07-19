export default (app) => {
    app.controller('EventAttendController', EventAttendController);

    function EventAttendController(EventAttendService, $window) {
        const EventCtrl = this;

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

        EventCtrl.attendEvent = (event_id) => {
            EventAttendService.attendEvent(event_id).then(response => {
                console.log(response.data);
            });
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

        EventCtrl.getEvents = () => {
            EventAttendService.getEvents().then(response => {
                EventCtrl.events = response.data.data;
                console.log(EventCtrl.events);
            });
        };

        $('#recommendationModal').on('show.bs.modal', function (e) {
            EventAttendService.getPredictions().then(response => {
                EventCtrl.predictions = response.data.data;
                console.log(EventCtrl.predictions);
            });
        });        

        $('#detailModal').on('show.bs.modal', function (e) {
            var eventId = $(e.relatedTarget).data('id');
            console.log(eventId);

            const event = EventCtrl.events.filter(o => o.event_id == eventId)[0];
            $(e.currentTarget).find('#detailModalTitle').text(event.event_name);
            $(e.currentTarget).find('#detailModalDescription').text(event.country + ", " + event.city);
        });
    };
}