export default (app) => {
    app.controller('AccountLoginController', LoginController);

    LoginController.$inject = ['$window'];
    function LoginController($window) {
        const LoginCtrl = this;

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

        LoginCtrl.username = null;

        LoginCtrl.login = function () {
            if (LoginCtrl.username in users)
                window.location.replace("http://localhost:3000/#!/predict?username=" + LoginCtrl.username);
            else
                alert("Geçersiz Kullanıcı.");
        }
    };
};