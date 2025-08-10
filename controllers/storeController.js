const Favourite = require("../models/favourite");
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
    const favHomeId = await Favourite.getFavourite();

    const favaouriteswithDetails = registeredHomes.filter((home) =>
      favHomeId.includes(home.id)
    );

    res.render("store/favourite-list", {
      favourites: favaouriteswithDetails,
      pageTitle: "My Favourites",
      currentPage: "favaourites",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

exports.postAddToFavourite = async (req, res, next) => {
  try {
    const homeId = req.body.id;
    await Favourite.addToFavourite(homeId);
    res.redirect("/favourites");
  } catch (error) {
    console.log("Error adding favourites", error);
    res.status(500).send("Internal Sever error");
  }
};

exports.postRemoveFromFavourite = async (req, res, next) => {
  try {
    const homeId = req.params.homeId;
    await Favourite.deleteById(homeId);
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
    });
  } catch (error) {
    console.log("Error getting home details", error);
  }
};
