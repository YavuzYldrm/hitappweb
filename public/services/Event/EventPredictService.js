export default (app) => {

    app.service('EventPredictService', EventPredictService);

    EventPredictService.$inject = ['$http'];

    function EventPredictService($http) {
        const PredictSrvc = this;

        PredictSrvc.baseUrl = 'https://ml-tbt-hitappengine-api.herokuapp.com/api/v1';

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
