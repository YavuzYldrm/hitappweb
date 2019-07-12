export default (app) => {

    app.service('AccountFriendService', AccountFriendService);

    function AccountFriendService($http, $cookies) {
        const AccountSrvc = this;

        const url = process.env.API_URL || 'http://127.0.0.1:5000/api/v1';

        AccountSrvc.getFriends = function () {
            const token = $cookies.get('token');
            if (!token) {
                console.error("Not Authenticated");
                return;
            }
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            return $http({
                method: 'GET',
                url: url + '/account/friends'
            });
        };

        AccountSrvc.searchUser = function (input) {
            const token = $cookies.get('token');
            if (!token) {
                console.error("Not Authenticated");
                return;
            }
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            
            return $http({
                method: 'GET',
                url: url + '/account/search?value='+input,
                headers: {"Content-Type":"application/json" },
            });
        }

        AccountSrvc.setFriend = function (person_id, operation) {
            const token = $cookies.get('token');
            if (!token) {
                console.error("Not Authenticated");
                return;
            }
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            return $http({
                method: 'POST',
                url: url + '/account/friends',
                data: {
                    "person_id": person_id,
                    "operation": operation
                }
            });
        };
    };
};
