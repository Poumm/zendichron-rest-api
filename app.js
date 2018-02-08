const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const storyRoutes = require("./routes/storyRoutes");
const config = require("./api-config.js");
mongoose.Promise = global.Promise;

mongoose.connect(config.dbUrl, {
  useMongoClient: true,
  keepAlive: 300000,
  connectTimeoutMS: 30000
});
var conn = mongoose.connection;

conn.on("error", console.error.bind(console, "connection error:"));

conn.once("open", function() {
  console.log("connection ok");
});

// Add headers allow cross access
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", config.allowOrigin);
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
