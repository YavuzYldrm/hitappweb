export default (app) => {

    app.service('AccountLoginService', AccountLoginService);

    AccountLoginService.$inject = ['$http'];

    function AccountLoginService($http) {
        const LoginSrvc = this;

        const url = process.env.API_URL || 'http://127.0.0.1:5000/api/v1'; 
        delete $http.defaults.headers.common['X-Requested-With'];
        LoginSrvc.getLoginResult = function (user) {
            return $http({
                method: 'POST',
                url: url + '/login',
                data: user,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type"
                },
            });
        };
    };
};
