const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PageSchema = require("./page");

const StorySchema = new Schema({
  title: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  isOfficial: { type: Boolean, default: false, required: true },
  summary: String,
  pages: [PageSchema]
});

//Le nom de model utiliser pour être chargé dans un autre model (comme blogpost plus haut) ou dans les requête de populate
const story = mongoose.model("story", StorySchema);

module.exports = story;
