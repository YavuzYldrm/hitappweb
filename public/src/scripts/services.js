export default (app) => {
    require('./services/Event/EventPredictService').default(app);
    require('./services/Account/AccountLoginService').default(app);
}


