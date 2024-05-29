const Song = require("../models/song");
const asyncHandler = require("express-async-handler");

const song_list = asyncHandler(async (req, res, next) => {
  const allSongs = await Song.find()
    .populate({
      path: "album",
      populate: {
        path: "artist",
      },
    })
    .sort({ name: 1 })
    .exec();

  res.render("song_list", {
    title: "All Songs",
    song_list: allSongs,
  });
});

const song_detail = asyncHandler(async (req, res, next) => {
  res.send(`Not Implemented: song detail: ${req.params.id}`);
});

// GET create
const song_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: song create get");
});

// POST create
const song_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: song create post");
});

// GET delete
const song_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: song delete GET");
});

// POST delete
const song_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: song delete POST");
});

// GET update
const song_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: song update GET");
});

// POST update
const song_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: song update POST");
});

module.exports = {
  song_list,
  song_detail,
  song_create_get,
  song_create_post,
  song_delete_get,
  song_delete_post,
  song_update_get,
  song_update_post,
};
