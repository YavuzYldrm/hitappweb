export default (app) => {

    app.controller('AccountRegisterController', AccountRegisterController);

    //RegisterController.$inject = ['$window'];
    function AccountRegisterController(AccountRegisterService, $window, $cookies, $rootScope, $location) {
        const AccountCtrl = this;

        const keys = {
            "locale": ["id_ID", "en_US", "ka_GE", "es_LA", "fr_FR", "ar_AR", "en_GB", "pt_BR", "th_TH", "vi_VN"],
            "location": ["Medan Indonesia", "Stratford Ontario", "Tehran Iran", "Phnom Penh", "Djokja Yogyakarta Indonesia", "Triolet Mauritius", "Surabaya Indonesia", "Plaine Des Papayes Pamplemousses Mauritius", "Tbilisi Georgia", "Jombang Jawa Timur Indonesia"],
            "gender": ["Erkek", "Kadın"]
        };

        AccountCtrl.keys = keys;

        AccountCtrl.disableButton = false;

        AccountCtrl.user = {
            username: "",
            password: "",
            locale: null,
            birthyear: 2000,
            gender: null,
            location: null,
        };

        AccountCtrl.form = {
            isInvalid: false,
            errorMessage: ""
        };

        AccountCtrl.checkBirthYear = function () {
            const currentYear = new Date().getFullYear();
            if (AccountCtrl.user.birthyear >= currentYear) {
                AccountCtrl.user.birthyear = 2000;
            }
        }

        AccountCtrl.register = () => {
            AccountCtrl.form.isInvalid = false;
            AccountCtrl.form.errorMessage = "";

            AccountRegisterService.getRegisterResult(AccountCtrl.user).then(response => {
                if (response != undefined && response.data.success) {
                    AccountCtrl.loader = false;
                    AccountCtrl.disableButton = false;

                    var date = new Date();
                    date.setDate(date.getDate() + 1);
                    $cookies.put('token', response.data.data.token, { 'expires': date });
                    $cookies.put('mnemonic', response.data.data.libra_mnemonic);
                    $rootScope.isAuthenticated = true;

                    $location.path('/profile');
                }
                else {
                    AccountCtrl.form.isInvalid = true;
                    AccountCtrl.form.errorMessage = err.data.message;
                }
            }).catch((err) => {
                AccountCtrl.form.isInvalid = true;
                AccountCtrl.form.errorMessage = err.data.message;
            });
        };
    }
};
