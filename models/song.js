// song
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SongSchema = new Schema({
  name: { type: String, required: true, maxLength: 20 },
  duration: { type: String, required: true },
  album: { type: Schema.Types.ObjectId, ref: "Album", required: true },
});

SongSchema.virtual("url").get(function () {
  return `catalog/song/${this._id}`;
});

module.exports = mongoose.model("Song", SongSchema);
