const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const storyRoutes = require("./routes/storyRoutes");
const dbUrl = require("./api-config.js");

mongoose.Promise = global.Promise;

mongoose.connect(dbUrl, { useMongoClient: true });

// Add headers allow cross access
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//the order define the order of execution
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("Running");
});
storyRoutes(app);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(422).send({ error: err.message });
});

module.exports = app;
