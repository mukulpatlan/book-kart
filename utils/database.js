const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect("mongodb+srv://mukulviket:MxhoKRKTjU81z3d2@cluster0.4hgdz.mongodb.net/book_kart?retryWrites=true&w=majority").then((result) => {
        console.log("connected.............");
        _db = result.db();
        callback(result);
    }).catch((err) => {
        console.log("error.............",err);
        throw err;
    })
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw "No database exist";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;