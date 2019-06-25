export default (app) => {
    
    app.controller('AccountRegisterController', RegisterController);

    RegisterController.$inject = ['$window'];
    function RegisterController($window) {
        const RegisterCtrl = this;

        const keys = {
            "locale": ["id_ID", "en_US", "ka_GE", "es_LA", "fr_FR", "ar_AR", "en_GB", "pt_BR", "th_TH", "vi_VN"],
            "location": ["Medan Indonesia", "Stratford Ontario", "Tehran Iran", "Phnom Penh", "Djokja Yogyakarta Indonesia", "Triolet Mauritius", "Surabaya Indonesia", "Plaine Des Papayes Pamplemousses Mauritius", "Tbilisi Georgia", "Jombang Jawa Timur Indonesia"],
            "gender": ["Erkek", "Kadın"]
        };

        RegisterCtrl.keys = keys;

        RegisterCtrl.disableButton = false;

        RegisterCtrl.userName = "";
        RegisterCtrl.locale = null;
        RegisterCtrl.birthyear = 2019;
        RegisterCtrl.gender = null;
        RegisterCtrl.registerDate = null;
        RegisterCtrl.location = null;

        RegisterCtrl.checkBirthYear = function () {
            const currentYear = new Date().getFullYear();
            if (RegisterCtrl.birthyear >= currentYear) {
                RegisterCtrl.birthyear = 2000;
            }
        }

        RegisterCtrl.getResult = function () {
            RegisterCtrl.rentRange = null;
            RegisterCtrl.loader = true;
            RegisterCtrl.disableButton = true;

            RegisterCtrl.response = PredictService.getResult(RegisterCtrl.detail);
            RegisterCtrl.response.then(function (response) {
                RegisterCtrl.rentRange = response.data[0];
                $window.scrollTo(0, 0);
                RegisterCtrl.loader = false;
                RegisterCtrl.disableButton = false;
            }, function (response) {
                console.log(response.status);
                RegisterCtrl.loader = false;
                RegisterCtrl.disableButton = false;
            })
        }
    }
};
