export default (app) => {

    app.service('AccountLoginService', AccountLoginService);

    AccountLoginService.$inject = ['$http'];

    function AccountLoginService($http) {
        const LoginSrvc = this;

        const url = process.env.API_URL || 'http://127.0.0.1:5000/api/v1'; 

        LoginSrvc.getLoginResult = function (user) {
            return $http({
                method: 'POST',
                url: url + '/login',
                data: user
            }).then(response => {
                return response;
            }).catch(err => {
                console.log(err);
                return null;
            });
        };
    };
};
