const jwt = require('jsonwebtoken');
const { accessToken } = require('../../../config/jwt-config');
const jwt_config = require('../../../config/jwt-config');

class JWTokenHelper {
    async generateTokenPair(login) {
        return new Promise((resolve) => {
            var accessToken = jwt.sign({data: login}, jwt_config.accessToken.secret,
            { algorithm: jwt_config.accessToken.alg, expiresIn: jwt_config.accessToken.expiration});

            var refreshToken = jwt.sign({data: login}, jwt_config.refreshToken.secret, 
            { algorithm: jwt_config.refreshToken.alg, expiresIn: jwt_config.refreshToken.expiration})

            resolve({accessToken: accessToken, refreshToken: refreshToken})
        })
    }

    async refreshToken(refreshToken) {
        return new Promise((resolve) => {
            try{
                var decoded = jwt.verify(refreshToken, jwt_config.refreshToken.secret);
                resolve(this.generateTokenPair(decoded.data));
            }
            catch(err) {
                resolve(false);
            }
        })
       
    }
}

module.exports = new JWTokenHelper();