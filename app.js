// Core Module
const path = require("path");

// External Module
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");
const DB_PATH =
  "mongodb+srv://root:root@kadane.5nyfqmw.mongodb.net/airbnb?retryWrites=true&w=majority&appName=kadane";
const { default: mongoose } = require("mongoose");

//Local Module
const authRouter = require("./routes/authRouter");
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});

///

const randomString = (length) => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, randomString(10) + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null , true);
  } else {
    cb(null, false);
  }
};

const multerOptions = {
  storage,fileFilter
};
app.use(express.urlencoded({ extended: true }));
app.use(multer(multerOptions).single("photo"));
app.use(express.static(path.join(rootDir, "public")));

app.use(
  session({
    secret: "kadane",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

//  middleware to normalize login cookie
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use("/auth", authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect("/auth/login");
  }
});
app.use("/host", hostRouter);

//404 error
app.use(errorController.pageNotFound);

const PORT = 3000;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("connected to mongodb");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("There is an error", error);
  });
