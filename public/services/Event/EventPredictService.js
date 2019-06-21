export default (app) => {

    app.service('EventPredictService', EventPredictService);

    EventPredictService.$inject = ['$http'];

    function EventPredictService($http) {
        const PredictSrvc = this;

        PredictSrvc.baseUrl = 'http://127.0.0.1:5000/api/v1';

        PredictSrvc.getResult = function (features,model, response) {
            return $http({
                method: 'POST',
                url: PredictSrvc.baseUrl + '/predict',
                data: {
                    features:features,
                    model:"event"
                }
            });
        };
    };
};
