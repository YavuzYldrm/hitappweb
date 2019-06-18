export default (app) => {

    app.service('AccountLoginService', AccountLoginService);

    AccountLoginService.$inject = ['$http'];

    function AccountLoginService($http) {
        const LoginSrvc = this;

        LoginSrvc.baseUrl = 'http://localhost:5000/api/v1';

        LoginSrvc.getLoginResult = function (user, response) {
            return $http({
                method: 'POST',
                url: LoginSrvc.baseUrl + '/login',
                data: user
            });
        };
    };
};
