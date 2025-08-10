// External Module
const express = require("express");
const storeRouter = express.Router();

//Local Module
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/bookings", storeController.getBookings);

storeRouter.get("/favourites", storeController.getFavouriteList);
storeRouter.post("/favourites", storeController.postAddToFavourite);
storeRouter.post(
  "/favourites/delete/:homeId",
  storeController.postRemoveFromFavourite
);

storeRouter.get("/homes/:homeId", storeController.getHomeDetails);

module.exports = storeRouter;
