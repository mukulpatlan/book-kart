const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const MONGODB_URI = process.env.mongo;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGODB_URI)
    .then((result) => {
      console.log("connected.............");
      _db = result.db();
      callback(result);
    })
    .catch((err) => {
      console.log("error.............", err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database exist";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
