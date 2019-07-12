export default (app) => {
    app.controller('AccountProfileController', AccountProfileController);

    function AccountProfileController(AccountProfileService, $cookies) {
        const AccountCtrl = this;

        AccountCtrl.details = {};

        AccountCtrl.getDetails = () => {
            AccountProfileService.getAccountDetails().then((response) => {
                AccountCtrl.details = response.data.data.details;
                console.log(AccountCtrl.details);
            });
        };
    };
};