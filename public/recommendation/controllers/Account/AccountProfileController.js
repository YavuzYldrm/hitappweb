export default (app) => {
    app.controller('AccountProfileController', AccountProfileController);

    function AccountProfileController(AccountProfileService, $cookies) {
        const AccountCtrl = this;

        AccountCtrl.details = {
            "balance":"Bekleniyor..."
        };

        AccountCtrl.getDetails = () => {
            AccountProfileService.getAccountDetails().then((response) => {
                AccountCtrl.details = response.data.data.details;
                AccountCtrl.details['balance'] = "Bekleniyor...";
            }).then(AccountCtrl.getWalletBalance);
        };

        // AccountProfileService.getWalletBalance promise döndürür.
        // Promise kullanımı promise.then(Bittiğinde Çalışacak fonksiyon).catch(err => hata objesi)
        AccountCtrl.getWalletBalance = () => {
            AccountProfileService.getWalletBalance(AccountCtrl.details.wallet).then(response => {
                AccountCtrl.details.balance = response.data['balance'];
            });
        };
    };
};