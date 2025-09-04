const session = require("express-session");
const Home = require("../models/home");
const User = require("../models/user");
const home = require("../models/home");

exports.getIndex = async (req, res, next) => {
  try {
    const registeredHomes = await Home.find();
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
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
      user: req.session.user,
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
    user: req.session.user,
  });
};

exports.getFavouriteList = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId).populate("favourites");

    res.render("store/favourite-list", {
      favourites: user.favourites,
      pageTitle: "My Favourites",
      currentPage: "favourites",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

exports.postAddToFavourite = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const homeId = req.body.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("user not found");
    }

    if (user.favourites.includes(homeId)) {
      return res.redirect("/favourites");
    }

    user.favourites.push(homeId);
    await user.save();
    res.redirect("/favourites");
  } catch (error) {
    console.log("Error adding favourites", error);
    res.status(500).send("Internal Sever error");
  }
};

exports.postRemoveFromFavourite = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const homeId = req.params.homeId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    
    user.favourites = user.favourites.filter(
      (favId) => favId.toString() !== homeId.toString()
    );

    await user.save();

    res.redirect("/favourites");
  } catch (error) {
    console.log("Error removing favourite", error);
    res.status(500).send("Internal Server Error");
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
      user: req.session.user,
    });
  } catch (error) {
    console.log("Error getting home details", error);
  }
};
