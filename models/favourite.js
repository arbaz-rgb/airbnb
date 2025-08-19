const { getDB } = require("../utils/databaseUtil");

class Favourite {
  constructor(houseId) {
    this.houseId = houseId;
  }

  async save() {
    const db = getDB();

    const existingOne = await db
      .collection("favourites")
      .findOne({ houseId: this.houseId });

    if (!existingOne) {
      // Insert only if not found
      return db.collection("favourites").insertOne(this);
    } else {
      // Return something meaningful if already exists
      return { message: "House is already in favourites" };
    }
  }

  static async getFavourite() {
    const db = getDB();
    return db.collection("favourites").find().toArray();
  }

  static async deleteById(homeId) {
    const db = getDB();
    return db.collection("favourites").deleteOne({ houseId: homeId });
  }
}

module.exports = Favourite;
