const Home = require("../models/home");

exports.getHomeAdd = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getHostHomes = async (req, res, next) => {
  try {
    const registeredHomes = await Home.fetchAll();
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
      currentPage: "host-homes",
    });
  } catch (errot) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

exports.getEditHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  const home = await Home.findById(homeId);
  if (!home) {
    return res.redirect("/host/host-home-list");
  }
  res.render("host/edit-home", {
    pageTitle: "Edit your Home",
    currentPage: "host-homes",
    editing: editing,
    home: home,
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();

  res.render("host/home-Added", {
    pageTitle: "Home Added Successfully",
    currentPage: "homeAdded",
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);

  home.id = id;
  home.save();
  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.deleteById(homeId);

  res.redirect("/host/host-home-list");
};
