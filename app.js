const express = require("express");
const router = require("./src/router/api");
const app = new express();
const BodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

// Security Middleware
const rateLimit = require("express-rate-limit");
const Sanitize = require("express-mongo-sanitize");
const Helmet = require("helmet");
const Hpp = require("hpp");
const xss = require("xss-clean");
const cors = require("cors");

// Database
const mongoose = require("mongoose");
app.use(express.static("../client-side/build"));

// Database Connection
let URL = process.env.MONGO_URL;

let OPTION = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4,
};
const connectDB = async () => {
  try {
    await mongoose.connect(URL, OPTION).then(() => {
      console.log("Database Connction Successfull");
    });
  } catch (err) {
    console.log("Database Connection Fail", err);
  }
};
connectDB();

// implement Json Data Limit
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb" }));
// Security Middleware Implement

app.use(Sanitize());
app.use(Helmet());
app.use(Hpp());
app.use(xss());
app.use(cors());
// Body Parser
app.use(BodyParser.json());

// RateLimiter
const Limit = rateLimit({ windowMs: 15 * 60 * 100, max: 1000 });
app.use(Limit);

//Backend API Version
app.use("/api/v1", router);

// Managing Font End Togging
app.get("*", function (req, res) {
  res.sendFile(
    path.resolve(__dirname, "../client-side/", "build", "index.html")
  );
});

module.exports = app;
