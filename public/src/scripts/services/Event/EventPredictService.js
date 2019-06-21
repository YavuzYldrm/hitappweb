export default (app) => {

    app.service('EventPredictService', EventPredictService);

    EventPredictService.$inject = ['$http'];

    function EventPredictService($http) {
        const PredictSrvc = this;

        PredictSrvc.baseUrl = 'http://localhost:5000/api';

        PredictSrvc.getResult = function (item, response) {
            return $http({
                method: 'POST',
                url: PredictSrvc.baseUrl + '/predict',
                data: item
            });
        };
    };
};
