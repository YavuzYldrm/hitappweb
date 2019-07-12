export default (app) => {
    app.controller('AccountFriendsController', AccountFriendsController);

    function AccountFriendsController(AccountFriendService, $window) {
        const AccountCtrl = this;

        AccountCtrl.friends = [];
        AccountCtrl.search = "";
        AccountCtrl.searchResults = [];

        AccountCtrl.setFriendStatus = () => {
            var el = $(event.target);
            el.attr('data-clicked', 1);
            el.text("Çıkar");
            el.attr('data-clicked', "1");
            el.addClass("btn-danger");
            el.removeClass("btn-success");
        };

        AccountCtrl.getFriends = () => {
            AccountFriendService.getFriends().then(response => {
                AccountCtrl.friends = response.data.data['friends'];
            });
        };

        AccountCtrl.searchUser = () => {
            AccountFriendService.searchUser(AccountCtrl.search).then(response => {
                AccountCtrl.searchResults = response.data.data['results'];
                console.log(AccountCtrl.searchResults);
            });
        };

        AccountCtrl.setFriend = (person_id, operation) => {
            AccountFriendService.setFriend(person_id, operation).then(response => {
                if (operation == 'add') {
                    var obj = getSearchUserObject(person_id);
                    AccountCtrl.friends.push(obj);

                    var index = AccountCtrl.searchResults.indexOf(obj);
                    if (index > -1)
                        AccountCtrl.searchResults.splice(index, 1);
                }
                else if (operation == 'remove') {
                    var obj = getFriendsUserObject(person_id);

                    var index = AccountCtrl.friends.indexOf(obj);
                    if (index > -1)
                        AccountCtrl.friends.splice(index, 1);
                }
            });
        };

        function getSearchUserObject(id) {
            return AccountCtrl.searchResults.filter(obj=>obj.id == id)[0];
        }

        function getFriendsUserObject(id) {
            return AccountCtrl.friends.filter(obj=>obj.id == id)[0];
        }

        // AccountCtrl.isFriend = (key) => {
        //     return AccountCtrl.friends[key] == undefined;
        // }

        // AccountCtrl.addFriend = (key) => {
        //     AccountCtrl.friends[key] = AccountCtrl.users[key];
        // };
        // AccountCtrl.removeFriend = (key) => {
        //     delete AccountCtrl.friends[key];
        // };

        // AccountCtrl.searchUser = () => {
        //     var result = {};
        //     angular.forEach(AccountCtrl.users, (value, key) => {
        //         if (AccountCtrl.searchValue == "")
        //             return;

        //         if (value.includes(String(AccountCtrl.searchValue).toUpperCase())) {
        //             result[key] = value;
        //         }
        //     });
        //     return result;
        // };
    };
};