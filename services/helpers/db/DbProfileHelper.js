const dbBaseHelper = require('./DbBaseHelper');
const messageHelper = require('../other/MessageHelper');

class DbProfileHelper {
    getProfile(login, resp) {
        dbBaseHelper.getMongoClient().connect((err, client) => {
            if(err) {
                throw err;
            }

            const collection = dbBaseHelper.getCollection(client, "profiles");

            collection.findOne({userLogin: login}, (err, result) => {
                if(err) {
                    throw err;
                }

                if(!result) {
                    resp.json(JSON.stringify({message: messageHelper.getEmptyProfileMessage()}));
                    client.close();
                }
                else {
                    resp.json(JSON.stringify({message: messageHelper.getFindingMessage(), profile: result}));
                    client.close();
                }
            })
        })
    }

    setProfile(profileModel, resp) {
        dbBaseHelper.getMongoClient().connect((err, client) => {
            if(err) {
                throw err;
            }

            const collection = dbBaseHelper.getCollection(client, "profiles");

            dbBaseHelper.insertItem(collection, profileModel, {client: client, resp: resp});
        })
    }

    updateProfile(profile, resp) {
        dbBaseHelper.getMongoClient().connect((err, client) => {
            if(err) {
                throw err;
            }

            const collection = dbBaseHelper.getCollection(client, "profiles");

            dbBaseHelper.updateItem(collection, {userLogin: profileModel.userLogin},
                {$set: {name: profile.name, surname: profile.surname, birthday: profile.birthday}},
                {client: client, resp: resp});
        })
    }
}

module.exports = new DbProfileHelper();