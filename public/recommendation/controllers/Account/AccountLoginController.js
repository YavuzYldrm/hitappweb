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

        AccountCtrl.form = {
            isInvalid: false,
            errorMessage: ""
        };

        AccountCtrl.login = () => {
            AccountCtrl.form.isInvalid = false;
            AccountCtrl.form.errorMessage = "";

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
                    AccountCtrl.form.isInvalid = true;
                    AccountCtrl.form.errorMessage = response.data.message;
                }
            }).catch(err => {
                AccountCtrl.form.isInvalid = true;
                AccountCtrl.form.errorMessage = err.data.message
            });
        };

    };
};