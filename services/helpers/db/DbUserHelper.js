const User = require('../../../models/UserModel');
const messageHelper = require('../other/MessageHelper');
const jwtokenHelper = require('../other/JWTokenHelper');
const dbBaseHelper = require('./DbBaseHelper');

class DbUserHelper {
    
    getUser(login, password ,resp) {

        dbBaseHelper.getMongoClient().connect((err, client) => {
            if(err) {
                resp.json(JSON.stringify({message: messageHelper.getServerError()}));
                throw err;
            }
            const collection = dbBaseHelper.getCollection(client, "users");

            this.findUser(collection, {login: login, password: password}, {resp: resp, client: client});

        })

        return;
    }

    findUser(collection, userOptions, serverOptions) {

        collection.findOne(userOptions, async (err, result) => {
            if(err) {
                serverOptions.resp.json(JSON.stringify({message: messageHelper.getServerError()}));
                throw err;
            }

            if(!result) {
                serverOptions.resp.json(JSON.stringify({message: messageHelper.getIncorrectLoginOrPasswordMessage()}));
            }
            

            else this.setTokenPair(await jwtokenHelper.generateTokenPair(userOptions.login), serverOptions);
        })

        return;
    }

    setTokenPair(tokenPair, serverOptions) {

        const collection = dbBaseHelper.getCollection(serverOptions.client, "tokens");

        dbBaseHelper.checkForInserting(collection, tokenPair, 
            {accessToken: tokenPair.accessToken, refreshToken: tokenPair.refreshToken},
            serverOptions);
    }

    refreshTokenPair(accessToken, resp) {
        dbBaseHelper.getMongoClient().connect((err, client) => {
            if(err) {
                resp.json(JSON.stringify({message: messageHelper.getServerError()}));
                throw err;
            }
            
            const collection = dbBaseHelper.getCollection(client, "tokens");

            collection.findOne({accessToken: accessToken}, async (err, result) => {
                if(err) {
                    resp.json(JSON.stringify({message: messageHelper.getServerError()}));
                    throw err;
                }

                if(result) {
                    let tokenPair = await jwtokenHelper.refreshToken(result.refreshToken);

                    if(!tokenPair) {
                        this.removeTokenPair(accessToken, {client: client, resp: resp});
                        resp.json(JSON.stringify({message: messageHelper.getUnloginnedUserMessage()}));
                    }
                    else {
                        this.removeTokenPair(accessToken,{client: client, resp: resp});
                        this.setTokenPair(tokenPair, {client: client, resp: resp}); 
                    }
                }
                else {
                    this.removeTokenPair(accessToken, {client: client, resp: resp});
                    resp.json(JSON.stringify({message: messageHelper.getUnloginnedUserMessage()}));
                }
            })
        })
    }

    removeTokenPair(accessToken, serverOptions) {

        const collection = dbBaseHelper.getCollection(serverOptions.client, "tokens");

        collection.findOne({accessToken: accessToken}, (err, result) => {
            if(err){
                serverOptions.resp.json(JSON.stringify({message: messageHelper.getServerError()}));
                throw err;
            }

            if(result) {
                collection.deleteOne({accessToken: result.accessToken}, (err) => {
                    if(err){
                        serverOptions.resp.json(JSON.stringify({message: messageHelper.getServerError()}));
                        throw err;
                    }
                })
            }
        })
    }


    setUser(login, email, password, resp) {

        dbBaseHelper.getMongoClient().connect((err, client) => {
            if(err) {
                throw err;
            }

            const collection = dbBaseHelper.getCollection(client, "users");

            dbBaseHelper.checkForInserting(collection, 
                new User(login, email, password),
                {login: login, email: email, password: password}, 
                {client: client, resp: resp});

        })
    }
}

module.exports = new DbUserHelper();