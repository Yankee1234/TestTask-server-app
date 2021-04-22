const dbUserHelper = require('./helpers/db/DbUserHelper');

class AuthService {
    getUser(req, resp) {
        let data = req.body;
        dbUserHelper.getUser(data.login, data.password, resp);
    }

    setUser(req, resp) {
        let data = req.body;
        dbUserHelper.setUser(data.login, data.email, data.password, resp);
    }

    refreshToken(req, resp) {
        let data = req.body;
        dbUserHelper.refreshTokenPair(data.accessToken, resp);
    }

    removeTokenPair(req, resp) {
        let data = req.body;
        dbUserHelper.removeTokenPair(data.accessToken);
        resp.end();
    }
}

module.exports = new AuthService();