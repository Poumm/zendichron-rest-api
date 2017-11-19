const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const storyRoutes = require("./routes/storyRoutes");

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== "test")
  mongoose.connect("mongodb://localhost/zendichron", { useMongoClient: true });

// Doivent être définies dans cet ordre
// En effet l'ordre défini ici est l'ordre dans lequel les middleware sont appelés
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("Running");
});
storyRoutes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
