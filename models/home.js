const fs = require("fs").promises;
const path = require("path");
const rootDir = require("../utils/pathUtil");
const Favourite = require("./favourite");

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

      if (this.id) {
        // edit-home case: update existing record
        const existingIndex = homes.findIndex((home) => home.id === this.id);
        if (existingIndex !== -1) {
          homes[existingIndex] = this; // replace with updated data
        } else {
          console.log("Home not found for update");
        }
      } else {
        // add-home case
        this.id = Math.random().toString();
        homes.push(this);
      }

      await fs.writeFile(homeDataPath, JSON.stringify(homes));
    } catch (error) {
      console.log("Error while writing the file:", error);
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

  static async findById(homeId) {
    try {
      const homes = await Home.fetchAll();
      const homeFound = homes.find((home) => home.id == homeId) || null;
      return homeFound;
    } catch (error) {
      console.error("Error finding home by ID:", error);
      return null;
    }
  }

  static async deleteById(homeId) {
    try {
      const homes = await Home.fetchAll();
      const homesAfterDelete = homes.filter((home) => home.id !== homeId);
      await fs.writeFile(homeDataPath, JSON.stringify(homesAfterDelete));
      await Favourite.deleteById(homeId);
      console.log(`Home with ID ${homeId} deleted successfully`);
    } catch (error) {
      console.log(`Error while deleting the ID ${homeId}`, error);
    }
  }
}

module.exports = Home;
