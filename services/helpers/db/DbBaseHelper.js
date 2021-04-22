const db_config = require('../../../config/db-config');
const MongoClient = require('mongodb').MongoClient;
const messageHelper = require('../other/MessageHelper');

class DbBaseHelper {
    checkForInserting(collection, item, options, serverOptions) {
        
        collection.findOne(options, (err, result) => {
            if(err) {
                throw err;
            }

            if(!result) {
                this.insertItem(collection, item, 
                    serverOptions);
            }
            else {
                serverOptions.resp.json(JSON.stringify({message: messageHelper.getExistsError()}));
                serverOptions.client.close();
            }
        })

        return;
    }

    insertItem(collection, item, serverOptions) {
        collection.insertOne(item, (err, result) => {
            
            if(err) {
                serverOptions.resp.json(JSON.stringify({message: messageHelper.getServerError()}));
                serverOptions.client.close();
                throw err;
            }

            if(result) {
                if(item.hasOwnProperty('accessToken')) {
                    
                    serverOptions.resp.json(JSON.stringify({message: messageHelper.getSuccessfulInsertingMessage(), accessToken: item.accessToken}));
                }
                else serverOptions.resp.json(JSON.stringify({message: messageHelper.getSuccessfulInsertingMessage()}));

                serverOptions.client.close();
                return;
            }
        })

        return;
    }

    updateItem(collection, filter, options, serverOptions) {
        collection.updateOne(filter, options, (err) => {
            if(err) {
                serverOptions.resp.json(JSON.stringify({message: messageHelper.getServerError()}));
                serverOptions.client.close();
                throw err;
            }

            serverOptions.resp.json(JSON.stringify({message: messageHelper.getUpdateMessage()}));

            serverOptions.client.close();
        })
    }

    getMongoClient(){
        return new MongoClient(db_config.connection_string,{ useNewUrlParser: true, useUnifiedTopology: true });
    }

    getCollection(client, name) {
        return client.db(db_config.db_name).collection(name);
    }
}

module.exports = new DbBaseHelper();