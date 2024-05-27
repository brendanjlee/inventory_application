const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create schema
const LabelSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 20 },
  description: { type: String, required: true, minLength: 10, maxLength: 50 },
  location: { type: String, required: true, minLength: 3, maxLength: 20 },
});

// virtual url
LabelSchema.virtual("url").get(function () {
  return `/catalog/label/${this._id}`;
});

module.exports = mongoose.model("Label", LabelSchema);
