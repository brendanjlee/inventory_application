// artist
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const mongoose = require("mongoose");

const ArtistSchema = new Schema({
  name: { type: String, required: true, maxLength: 20 },
  description: { type: String, required: true, maxLength: 200 },
  debut: { type: Date, required: true },
});

ArtistSchema.virtual("url").get(function () {
  return `catalog/artist/${this._id}`;
});

module.exports = mongoose.model("Artist", ArtistSchema);
