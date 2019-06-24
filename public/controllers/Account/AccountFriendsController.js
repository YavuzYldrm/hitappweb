export default (app) => {

    app.controller('AccountFriendsController', AccountFriendsController);

    AccountFriendsController.$inject = ['$window'];
    function AccountFriendsController($window) {
        const AccountCtrl = this;

        AccountCtrl.users = {
            151534919: "ALİ",
            265212492: "VELİ",
            2238882361: "CEMİL",
            1776192: "AHMET",
            23465780: "BÜLENT",
            20018153: "TAHA",
            15390083: "ŞAFAK",
            7514340: "BERKAY",
            50521271: "FATİH",
            2034510440: "MAHMUT",
            2664817652: "CANLI"
        };

        AccountCtrl.friends = {};

        AccountCtrl.setFriendStatus = () => {
            var el = $(event.target);
            console.log(el);
            el.attr('data-clicked', 1);
            el.text("Çıkar");
            el.attr('data-clicked', "1");
            el.addClass("btn-danger");
            el.removeClass("btn-success");
        };

        AccountCtrl.isFriend = (key) => {
            return AccountCtrl.friends[key] == undefined;
        }

        AccountCtrl.addFriend = (key) => {
            AccountCtrl.friends[key] = AccountCtrl.users[key];
        };
        AccountCtrl.removeFriend = (key) => {
            delete AccountCtrl.friends[key];
        };

        AccountCtrl.searchUser = () => {
            var result = {};
            angular.forEach(AccountCtrl.users, (value, key) => {
                if (AccountCtrl.searchValue == "")
                    return;

                if (value.includes(String(AccountCtrl.searchValue).toUpperCase())) {
                    result[key] = value;
                }
            });
            return result;
        };
    };
};