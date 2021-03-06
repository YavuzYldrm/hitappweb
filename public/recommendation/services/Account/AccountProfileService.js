export default (app) => {

    app.service('AccountProfileService', AccountProfileService);

    function AccountProfileService($http, $cookies) {
        const AccountSrvc = this;

        const url = process.env.API_URL || 'http://127.0.0.1:5000/api/v1';
        const libra_url = process.env.LIBRA_API_URL || 'http://127.0.0.1:4000/api/v1';

        AccountSrvc.getAccountDetails = () => {
            const token = $cookies.get('token');
            if (!token) {
                console.error("Not Authenticated");
                return;
            }
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            return $http({
                method: 'GET',
                url: url + '/account'
            });
        };

        // $http() Promise Döndürür https://developer.mozilla.org/tr/docs/Web/JavaScript/Reference/Global_Objects/Promise
        // https://docs.angularjs.org/api/ng/service/$http
        AccountSrvc.getWalletBalance = (address) => {
            return $http({
                method: 'POST',
                url: libra_url + '/getBalance',
                data: {
                    "address": address                }
            });
        };
    };
};
