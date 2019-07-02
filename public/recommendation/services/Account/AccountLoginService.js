export default (app) => {

    app.service('AccountLoginService', AccountLoginService);

    AccountLoginService.$inject = ['$http'];

    function AccountLoginService($http) {
        const LoginSrvc = this;

        const url = process.env.API_URL || 'http://192.168.5.55:5000/api/v1'; 

        LoginSrvc.getLoginResult = function (user, response) {
            return $http({
                method: 'POST',
                url: url + '/login',
                data: user
            }).then(response => {
                console.log(response);
            }).catch(err => {
                console.error("Login failed." + err);
            });
        };
    };
};
