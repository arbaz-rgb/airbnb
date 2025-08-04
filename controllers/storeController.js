const Home = require("../models/home");

exports.getIndex = async (req, res, next) => {
  try {
    const registeredHomes = await Home.fetchAll();
    res.render("store/index", {
      registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

exports.getHomes = async (req, res, next) => {
  try {
    const registeredHomes = await Home.fetchAll();
    res.render("store/home-list", {
      registeredHomes,
      pageTitle: "Home-list",
      currentPage: "Home",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.getFavouriteList = async (req, res, next) => {
  try {
    const registeredHomes = await Home.fetchAll();
    res.render("store/favourite-list", {
      registeredHomes: registeredHomes,
      pageTitle: "My Favourites",
      currentPage: "favaourites",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};
