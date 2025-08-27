const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = async (req, res, next) => {
  try {
    const registeredHomes = await Home.find();
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
      isLoggedIn: req.isLoggedIn,
    });
  } catch (err) {
    console.error("Error fetching homes:", err);
    next(err);
  }
};

exports.getHomes = async (req, res, next) => {
  try {
    const registeredHomes = await Home.find();
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Home-list",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.getFavouriteList = async (req, res, next) => {
  try {
    const favHomeDocs = await Favourite.find().populate("houseId");
    const favaouriteswithDetails = favHomeDocs.map((fav) => fav.houseId);

    res.render("store/favourite-list", {
      favourites: favaouriteswithDetails,
      pageTitle: "My Favourites",
      currentPage: "favaourites",
      isLoggedIn: req.isLoggedIn,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

exports.postAddToFavourite = async (req, res, next) => {
  try {
    const homeId = req.body.id;

    const exist = await Favourite.findOne({ houseId: homeId });
    if (exist) {
      return res.redirect("/favourites");
    }
    const favaourite = new Favourite({ houseId: homeId });
    await favaourite.save();
    res.redirect("/favourites");
  } catch (error) {
    console.log("Error adding favourites", error);
    res.status(500).send("Internal Sever error");
  }
};

exports.postRemoveFromFavourite = async (req, res, next) => {
  try {
    const homeId = req.params.homeId;
    await Favourite.findOneAndDelete({ houseId: homeId });
    res.redirect("/favourites");
  } catch (error) {
    console.log("Error adding favourites", error);
    res.status(500).send("Internal Sever error");
  }
};

exports.getHomeDetails = async (req, res, next) => {
  try {
    const homeId = req.params.homeId;
    const home = await Home.findById(homeId);

    if (!home) {
      return res.redirect("/homes");
    }

    res.render("store/home-detail", {
      home: home,
      pageTitle: "Home Detail",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
    });
  } catch (error) {
    console.log("Error getting home details", error);
  }
};
