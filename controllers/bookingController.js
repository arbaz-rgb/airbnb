const Booking = require("../models/booking");
const Home = require("../models/home");

exports.getBookingForm = async (req, res, next) => {
  try {
    const home = await Home.findById(req.params.homeId);
    if (!home) {
      return res.redirect("/");
    }

    res.render("store/booking-form", {
      home,
      pageTitle: `Book ${home.houseName}`,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
      currentPage: "index",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading booking form");
  }
};

exports.postBooking = async (req, res, next) => {
  try {
    const { homeId, checkIn, checkOut } = req.body;
    const user = req.session.user;

    const home = await Home.findById(homeId);
    if (!home) return res.redirect("/");

    // Calculate number of days
    const nights =
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);

    const totalPrice = nights * home.price;

    const booking = new Booking({
      user: user._id,
      home: homeId,
      checkIn,
      checkOut,
      totalPrice,
    });

    await booking.save();

    res.redirect("/my-bookings");
  } catch (err) {
    console.error(err);
    res.status(500).send("Booking failed");
  }
};

exports.getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({
      user: req.session.user._id,
    }).populate("home");

    res.render("store/my-bookings", {
      bookings,
      pageTitle: "My Bookings",
      isLoggedIn: req.isLoggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading bookings");
  }
};
