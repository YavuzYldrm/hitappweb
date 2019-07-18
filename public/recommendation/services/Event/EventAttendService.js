export default (app) => {

    app.service('EventAttendService', EventAttendService);

    function EventAttendService($http, $rootScope, $cookies) {
        const EventSrvc = this;

        const url = process.env.API_URL || 'http://127.0.0.1:5000/api/v1';

        EventSrvc.getEvents = function () {
            const token = $cookies.get('token');
            if (!token) {
                console.error("Not Authenticated");
                return;
            }
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            
            return $http({
                method: 'GET',
                url: url + '/event'
            });
        };
    };
};
