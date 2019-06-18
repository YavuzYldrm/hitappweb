export default (app) => {

    app.controller('AccountFriendsController', AccountFriendsController);

    AccountFriendsController.$inject = ['$window'];
    function AccountFriendsController($window) {
        const AccountCtrl = this;

        const keys = {
            "users": {
                "ALİ": 151534919,
                "VELİ": 265212492,
                "CEMİL": 2238882361,
                "AHMET": 1776192,
                "BÜLENT": 23465780,
                "TAHA": 20018153,
                "ŞAFAK": 15390083,
                "BERKAY": 7514340,
                "FATİH": 50521271,
                "MAHMUT": 2034510440,
                "CANLI": 2664817652
            }
        };

        AccountCtrl.keys = keys;

        AccountCtrl.toggleFriend = (key) => {
            var el = $(event.target);
            console.log(key);
            var isAdded = el.attr('data-clicked');
            if (isAdded == "0") {
                el.text("Çıkar");
                el.attr('data-clicked', "1");
                el.addClass("btn-danger");
                el.removeClass("btn-success");
                el.addClass("btn-danger");
            }
            else {
                el.text("Ekle");
                el.attr('data-clicked', "0");
                el.addClass("btn-success");
                el.removeClass("btn-danger");
            }
        };
    };

    app.directive('myPostRepeatDirective', function () {
        return function (scope, element, attrs) {
            var el = angular.element(element);
            // var elements = $('.btn');
            console.log(el.children());
            // elements.each(() => {
            //     var el = $(this);
            //     var isAdded = el.attr('data-clicked');
            //     if (isAdded == "0") {
            //         console.log("asd");
            //         el.text("Çıkar");
            //         el.addClass("btn-danger");
            //         el.removeClass("btn-success");
            //         el.addClass("btn-danger");
            //     }
            //     else {
            //         el.text("Ekle");
            //         el.addClass("btn-success");
            //         el.removeClass("btn-danger");
            //     }
            // });
        };
    });
};