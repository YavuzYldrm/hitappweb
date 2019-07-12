export default (app) => {

    app.controller('AccountRegisterController', RegisterController);

    //RegisterController.$inject = ['$window'];
    function RegisterController(AccountRegisterService, $window, $cookies, $rootScope, $location) {
        const RegisterCtrl = this;

        const keys = {
            "locale": ["id_ID", "en_US", "ka_GE", "es_LA", "fr_FR", "ar_AR", "en_GB", "pt_BR", "th_TH", "vi_VN"],
            "location": ["Medan Indonesia", "Stratford Ontario", "Tehran Iran", "Phnom Penh", "Djokja Yogyakarta Indonesia", "Triolet Mauritius", "Surabaya Indonesia", "Plaine Des Papayes Pamplemousses Mauritius", "Tbilisi Georgia", "Jombang Jawa Timur Indonesia"],
            "gender": ["Erkek", "Kadın"]
        };

        RegisterCtrl.keys = keys;

        RegisterCtrl.disableButton = false;

        RegisterCtrl.user = {
            username: "",
            password: "",
            locale: null,
            birthyear: 2000,
            gender: null,
            location: null,
        };

        RegisterCtrl.checkBirthYear = function () {
            const currentYear = new Date().getFullYear();
            if (RegisterCtrl.user.birthyear >= currentYear) {
                RegisterCtrl.user.birthyear = 2000;
            }
        }

        RegisterCtrl.register = () => {
            RegisterCtrl.loader = true;
            RegisterCtrl.disableButton = true;

            AccountRegisterService.getRegisterResult(RegisterCtrl.user).then(response => {
                if (response != undefined && response.data.success) {
                    RegisterCtrl.loader = false;
                    RegisterCtrl.disableButton = false;

                    var date = new Date();
                    date.setDate(date.getDate() + 1);
                    $cookies.put('token', response.data.data.token, { 'expires': date });
                    $cookies.put('mnemonic', response.data.data.libra_mnemonic);
                    $rootScope.isAuthenticated = true;

                    $location.path('/profile');
                }
                else {
                    RegisterCtrl.loader = false;
                    RegisterCtrl.disableButton = false;
                }
            }).catch((err) => {
                console.log(err);
            });
        };
    }
};
