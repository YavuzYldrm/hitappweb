export default (app) => {
    app.controller('AccountProfileController', ProfileController);

    //LoginController.$inject = ['AccountLoginService', '$window', '$location', '$cookies', 'loginRedirectUrl'];
    function ProfileController($rootScope, $window, $location, $cookies, loginRedirectUrl) {
        const AccountCtrl = this;
    };
};