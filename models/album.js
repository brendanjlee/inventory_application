// album
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 500 },
  release: { type: Date, required: true },
  artist: { type: Schema.Types.ObjectId, ref: "Artist", required: true },
  genre: { type: Schema.Types.ObjectId, ref: "Genre", required: true },
});

AlbumSchema.virtual("url").get(function () {
  return `/catalog/album/${this._id}`;
});

module.exports = mongoose.model("Album", AlbumSchema);
