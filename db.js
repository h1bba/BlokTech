const MongoClient = require('mongodb').MongoClient;
const password = process.env.PASSWORD;

let _db;

function connect(callback) {
    MongoClient.connect('mongodb+srv://hibbayt:' + password + '@databasecluster.8o2zfan.mongodb.net/?retryWrites=true&w=majority', function (err, client) {
        // handle the error if there is one
        if (err) throw err;

        // get a reference to the database
        _db = client.db('DINNERMATCH_DB');
        callback();
    });
}

function getDb() {
    if (!_db) {
        throw Error('Database not initialized!');
    }
    return _db;
}

module.exports = {
    connect,
    getDb,
};