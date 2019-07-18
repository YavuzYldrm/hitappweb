export default (app) => {
    require('../services/Event/EventPredictService').default(app);
    require('../services/Event/EventAttendService').default(app);

    require('../services/Account/AccountLoginService').default(app);
    require('../services/Account/AccountUpdateService').default(app);
    require('../services/Account/AccountProfileService').default(app);
    require('../services/Account/AccountRegisterService').default(app);
    require('../services/Account/AccountFriendService').default(app);
}


