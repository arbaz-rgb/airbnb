const fs = require("fs").promises;
const path = require("path");
const rootDir = require("../utils/pathUtil");

const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

class Favourite {
  static async addToFavourite(homeId) {
    try {
      const favourites = await Favourite.getFavourite();

      if (favourites.includes(homeId)) {
        console.log("Home is already marked favourite");
        return;
      }

      favourites.push(homeId);

      await fs.writeFile(
        favouriteDataPath,
        JSON.stringify(favourites),
        "utf-8"
      );

      console.log("Favourite saved successfully");
    } catch (error) {
      console.log("There is an error:", error);
    }
  }

  static async getFavourite() {
    try {
      const fileContent = await fs.readFile(favouriteDataPath, "utf-8");
      if (fileContent.length === 0) return [];
      return JSON.parse(fileContent);
    } catch (error) {
      console.log("There is an error:", error);
      return [];
    }
  }
}

module.exports = Favourite;
