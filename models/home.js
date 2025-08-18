const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/databaseUtil");

class Home {
  constructor(houseName, price, location, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  async save() {
    const updateFields = {
      houseName: this.houseName,
      price: this.price,
      location: this.location,
      rating: this.rating,
      photoUrl: this.photoUrl,
      description: this.description,
    };
    const db = getDB();
    if (this._id) {
      return db.collection("homes").updateOne(
        { _id: new ObjectId(String(this._id)) },
        {
          $set: updateFields,
        }
      );
    }
    return db.collection("homes").insertOne(this);
  }

  static async fetchAll() {
    const db = getDB();
    return db.collection("homes").find().toArray();
  }

  static async findById(homeId) {
    const db = getDB();
    return db
      .collection("homes")
      .findOne({ _id: new ObjectId(String(homeId)) });
  }

  static async deleteById(homeId) {
    const db = getDB();
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) });
  }
}

module.exports = Home;
