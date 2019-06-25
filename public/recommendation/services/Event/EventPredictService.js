export default (app) => {

    app.service('EventPredictService', EventPredictService);

    EventPredictService.$inject = ['$http', '$rootScope','$cookies'];

    function EventPredictService($http, $rootScope, $cookies) {
        const PredictSrvc = this;

        PredictSrvc.baseUrl = 'https://ml-tbt-hitappengine-api.herokuapp.com/api/v1';

        PredictSrvc.getResult = function (features,model, response) {
            console.log(features);
            if ($rootScope.isAuthenticated)
            {
                var token = $cookies.get('token');
                console.log(token);
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                return $http({
                    method: 'POST',
                    url: PredictSrvc.baseUrl + '/predict',
                    data: {
                        features:features,
                        model:"model"
                    }
                });
            }
        };
    };
};
