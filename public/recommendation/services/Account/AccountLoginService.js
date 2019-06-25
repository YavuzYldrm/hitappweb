export default (app) => {

    app.service('AccountLoginService', AccountLoginService);

    AccountLoginService.$inject = ['$http'];

    function AccountLoginService($http) {
        const LoginSrvc = this;

        LoginSrvc.baseUrl = 'https://ml-tbt-hitappengine-api.herokuapp.com/api/v1';

        LoginSrvc.getLoginResult = function (user, response) {
            return $http({
                method: 'POST',
                url: LoginSrvc.baseUrl + '/login',
                data: user
            });
        };
    };
};
