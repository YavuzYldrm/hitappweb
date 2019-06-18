export default (app) => {
    app.controller('AccountLoginController', LoginController);

    LoginController.$inject = ['AccountLoginService', '$window'];
    function LoginController(AccountLoginService,$window) {
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

        AccountCtrl.login = function () {
            AccountCtrl.loginStatus.failed = false;

            AccountCtrl.response = AccountLoginService.getLoginResult(AccountCtrl.user);
            AccountCtrl.response.then((response) => {
                console.log(response);
                if(response.data && response.data.success)
                {
                    AccountCtrl.loginStatus.message = response.data.message
                }
                else
                {
                    AccountCtrl.loginStatus.failed = true
                    AccountCtrl.loginStatus.message = response.data.message
                }
            });

            // if (AccountCtrl.username in users)
            //     window.location.replace("http://localhost:3000/#!/predict?username=" + AccountCtrl.username);
            // else
            //     alert("Geçersiz Kullanıcı.");
        };

    };
};