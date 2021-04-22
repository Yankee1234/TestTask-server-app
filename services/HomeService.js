const Profile = require('../models/ProfileModel');
const dbProfileHelper = require('./helpers/db/DbProfileHelper');

class HomeService {
    getProfile(req, resp) {
        let login = req.body.login;
        dbProfileHelper.getProfile(login, resp);
    }

    setProfile(req, resp) {
        let data = req.body;
        let profile = new Profile(data.userLogin, data.name, data.surname, data.birthday);
        dbProfileHelper.setProfile(profile, resp);
    }

    updateProfile(req, resp) {
        let data = req.body;
        let profile = new Profile(data.userLogin, data.name, data.surname, data.birthday);
        dbProfileHelper.updateProfile(profile, resp);
    }
}

module.exports = new HomeService();