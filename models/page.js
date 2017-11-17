const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PageSchema = new Schema({
  title: { type: String, required: true },
  content: Object
});
