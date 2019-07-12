export default (app) => {
    require('../services/Event/EventPredictService').default(app);
    require('../services/Account/AccountLoginService').default(app);
    require('../services/Account/AccountRegisterService').default(app);
    require('../services/Account/AccountFriendService').default(app);
}


