const { getDB } = require("../utils/databaseUtil");

class Home {
  constructor(houseName, price, location, rating, photoUrl, description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }

  async save() {
    const db = getDB();
    return db.collection("homes").insertOne(this);
  }

  static async fetchAll() {}

  static async findById(homeId) {}

  static async deleteById(homeId) {}
}

module.exports = Home;
