export default (app) => {
    require('../controllers/Account/AccountLoginController').default(app);
    require('../controllers/Account/AccountRegisterController').default(app);
    require('../controllers/Account/AccountFriendsController').default(app);
    require('../controllers/Account/AccountProfileController').default(app);

    require('../controllers/Event/EventAttendController').default(app);
    require('../controllers/Event/EventPredictController').default(app);
    require('../controllers/Event/EventCreateController').default(app);
}