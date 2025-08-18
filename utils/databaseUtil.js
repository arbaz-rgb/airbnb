const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const MONGO_URL =
  "mongodb+srv://root:root@kadane.5nyfqmw.mongodb.net/airbnb?retryWrites=true&w=majority&appName=kadane";

let _db;

const mongoConnect = async () => {
  try {
    const client = await MongoClient.connect(MONGO_URL);
    _db = client.db("airbnb");
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("ther is an error while connecting to the server", error);
    throw error;
  }
};

const getDB = () => {
  if (!_db) {
    throw new Error("Mongo not connected");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
