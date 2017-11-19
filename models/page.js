const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PageSchema = new Schema({
  title: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  content: Object
});
