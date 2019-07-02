export default (app) => {

    app.service('EventPredictService', EventPredictService);

    EventPredictService.$inject = ['$http', '$rootScope','$cookies'];

    function EventPredictService($http, $rootScope, $cookies) {
        const PredictSrvc = this;

        const url = process.env.API_URL || 'http://192.168.5.55:5000/api/v1'; 

        PredictSrvc.getResult = function (features,model, response) {
            console.log(features);
            if ($rootScope.isAuthenticated)
            {
                var token = $cookies.get('token');
                console.log(token);
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                return $http({
                    method: 'POST',
                    url: url + '/predict',
                    data: {
                        features:features,
                        model:"model"
                    }
                }).then(response => {
                    console.log(response);
                }).catch(err => {
                    console.error("Prediction failed. " + err);
                });
            }
        };
    };
};
