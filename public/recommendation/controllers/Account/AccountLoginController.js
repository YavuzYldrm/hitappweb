export default (app) => {
    app.controller('AccountLoginController', LoginController);

    function LoginController(AccountLoginService, $rootScope, $window, $location, $cookies,) {
        const AccountCtrl = this;
        
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

            AccountLoginService.getLoginResult(AccountCtrl.user).then(response => {
                if (response.data != undefined && response.data.success) {
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
                }
                else {
                    AccountCtrl.loginStatus.failed = true
                    AccountCtrl.loginStatus.message = response.data.message
                }
            }).catch(err => {
                console.warn("Authentication error");
            });
        };

    };
};