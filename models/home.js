const fs = require("fs").promises;
const path = require("path");
const rootDir = require("../utils/pathUtil");

const homeDataPath = path.join(rootDir, "data", "homes.json");

class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  async save() {
    try {
      const homes = await Home.fetchAll();
      homes.push(this);
      await fs.writeFile(homeDataPath, JSON.stringify(homes));
    } catch (error){
      console.log("error while writing the file")
    }
  }

  static async fetchAll() {
    try {
      const fileContent = await fs.readFile(homeDataPath, "utf-8");
      if (!fileContent.length) return [];
      return JSON.parse(fileContent);
    } catch (error) {
      console.log("File read Error", error);
      return [];
    }
  }
}

module.exports = Home;
