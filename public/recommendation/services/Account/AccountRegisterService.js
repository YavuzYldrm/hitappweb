export default (app) => {

    app.service('AccountRegisterService', AccountRegisterService);

    AccountRegisterService.$inject = ['$http'];

    function AccountRegisterService($http) {
        const RegisterSrvc = this;

        const url = process.env.API_URL || 'http://127.0.0.1:5000/api/v1';

        RegisterSrvc.getRegisterResult = (user) => {
            return $http({
                method: 'POST',
                url: url + '/register',
                data: user
            });
        };
    };
};
