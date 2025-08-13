const db = require("../utils/databaseUtil");

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
    if (this.id) {
    
      return db.execute(
        "UPDATE homes SET houseName=?, price=?, location=?, rating=?, photoUrl=?, description=? WHERE id=?",
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.photoUrl,
          this.description,
          this.id,
        ]
      );
    } else {
      return db.execute(
        "INSERT INTO homes (houseName, price, location, rating, photoUrl, description) VALUES (?, ?, ?, ?, ?, ?)",
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.photoUrl,
          this.description,
        ]
      );
    }
  }

  static async fetchAll() {
    return db.execute("SELECT * FROM homes");
  }

  static async findById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id=?", [homeId]);
  }

  static async deleteById(homeId) {
    return db.execute("DELETE FROM homes WHERE id=?", [homeId]);
  }
}

module.exports = Home;
