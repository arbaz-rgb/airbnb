const Home = require("../models/home");
const path = require("path");
const fs = require("fs");

exports.getHomeAdd = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getHostHomes = async (req, res, next) => {
  try {
    const registeredHomes = await Home.find();
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (error) {
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
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.postAddHome = async (req, res, next) => {
  try {
    const { houseName, price, location, rating, description } = req.body;

    // multer stores uploaded file details in req.file
    const photo = req.file.path;

    const home = new Home({
      houseName,
      price,
      location,
      rating,
      photo,
      description,
    });

    await home.save();

    res.render("host/home-Added", {
      pageTitle: "Home Added Successfully",
      currentPage: "homeAdded",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    console.error("Error adding home:", err);
    res.status(500).send("Something went wrong while adding the home");
  }
};

exports.postEditHome = async (req, res, next) => {
  try {
    const { id, houseName, price, location, rating, description } = req.body;

    const home = await Home.findById(id);
    if (!home) {
      return res.redirect("/host/host-home-list");
    }

    home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    home.description = description;

    if (req.file) {
      const oldPhotoPath = path.join(__dirname, "..", home.photo);
      fs.unlink(oldPhotoPath, (err) => {
        if (err) {
          console.error("Error while deleting old photo:", err);
        }
      });

      home.photo = req.file.path;
    }
    await home.save();
    res.redirect("/host/host-home-list");
  } catch (err) {
    console.error("Error editing home:", err);
    res.status(500).send("Something went wrong while editing the home");
  }
};

exports.postDeleteHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  await Home.findByIdAndDelete(homeId);

  res.redirect("/host/host-home-list");
};
