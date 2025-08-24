// Core Module
const path = require("path");

// External Module
const express = require("express");

//Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");

const errorController = require("./controllers/error");

const { default: mongoose } = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));

app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, "public")));
//404 error
app.use(errorController.pageNotFound);

const PORT = 3000;

const DB_PATH =
  "mongodb+srv://root:root@kadane.5nyfqmw.mongodb.net/airbnb?retryWrites=true&w=majority&appName=kadane";

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
