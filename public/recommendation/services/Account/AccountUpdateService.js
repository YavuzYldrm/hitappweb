export default (app) => {

    app.service('AccountUpdateService', AccountUpdateService);

    AccountUpdateService.$inject = ['$http'];

    function AccountUpdateService($http) {
        const AccountSrvc = this;

        const url = process.env.API_URL || 'http://127.0.0.1:5000/api/v1';

        AccountSrvc.getRegisterResult = (user) => {
            return $http({
                method: 'POST',
                url: url + '/account',
                data: user
            });
        };
    };
};
