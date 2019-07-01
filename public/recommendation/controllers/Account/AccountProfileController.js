export default (app) => {
    app.controller('AccountLoginController', LoginController);

    //LoginController.$inject = ['AccountLoginService', '$window', '$location', '$cookies', 'loginRedirectUrl'];
    function LoginController(AccountLoginService, $rootScope, $window, $location, $cookies, loginRedirectUrl) {
        const AccountCtrl = this;

        const users = {
            "ALİ": 151534919,
            "VELİ": 265212492,
            "CEMİL": 2238882361,
            "AHMET": 1776192,
            "BÜLENT": 23465780,
            "TAHA": 20018153,
            "ŞAFAK": 15390083,
            "BERKAY": 7514340,
            "FATİH": 50521271,
            "MAHMUT": 2034510440,
            "CANLI": 2664817652
        };

        AccountCtrl.user = {
            username: null,
            password: null,
        };

        AccountCtrl.loginStatus = {
            failed: false,
            message: null
        };

        AccountCtrl.login = () => {
            AccountCtrl.loginStatus.failed = false;

            AccountLoginService.getLoginResult(AccountCtrl.user).then((response) => {
                if (response.data && response.data.success) {
                    AccountCtrl.loginStatus.message = response.data.message

                    // Token expiration
                    var date = new Date();
                    date.setDate(date.getDate() + 1);
                    $cookies.put('token', response.data.data.token, { 'expires': date });
                    $rootScope.isAuthenticated = true;

                    if ($rootScope.url)
                        $location.path($rootScope.url);
                    else
                        $location.path('/');
                } else {
                    AccountCtrl.loginStatus.failed = true
                    AccountCtrl.loginStatus.message = response.data.message
                }
            });
        };

    };
};