// cd
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CDSchema = new Schema({
  album: { type: Schema.Types.ObjectId, ref: "Album", required: true },
  price: { type: Number, min: 0, max: 999, required: true },
  stock: { type: Number, min: 0, max: 10000, required: true },
});

CDSchema.virtual("url").get(function () {
  return `/catalog/cd/${this._id}`;
});

module.exports = mongoose.model("CD", CDSchema);
