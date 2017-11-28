const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const storyRoutes = require("./routes/storyRoutes");

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== "test")
  mongoose.connect("mongodb://localhost/zendichron", { useMongoClient: true });

// Add headers
app.use(function(req, res, next) {
  // allow access to react Client
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//the order define the order of execution
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("Running");
});
storyRoutes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
