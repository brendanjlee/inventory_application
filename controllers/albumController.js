const Album = require("../models/album");
const Artist = require("../models/artist");
const CD = require("../models/cd");
const Song = require("../models/song");
const Genre = require("../models/genre");

const asyncHandler = require("express-async-handler");

const index = asyncHandler(async (req, res, next) => {
  // fetch details for all instances
  const [numArtists, numAlbums, numSongs, numCDs, numGenres] =
    await Promise.all([
      Artist.countDocuments({}).exec(),
      Album.countDocuments({}).exec(),
      Song.countDocuments({}).exec(),
      CD.countDocuments({}).exec(),
      Genre.countDocuments({}).exec(),
    ]);

  res.render("index", {
    title: "Music Store Home",
    artist_count: numArtists,
    album_count: numAlbums,
    song_count: numSongs,
    cd_count: numCDs,
    genre_count: numGenres,
  });
});

const album_list = asyncHandler(async (req, res, next) => {
  const allAlbums = await Album.find()
    .populate("artist genre")
    .sort({ name: 1 })
    .exec();

  res.render("album_list", {
    title: "All Albums",
    album_list: allAlbums,
  });
});

const album_detail = asyncHandler(async (req, res, next) => {
  res.send(`Not Implemented: album detail: ${req.params.id}`);
});

// GET create
const album_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: album create get");
});

// POST create
const album_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: album create post");
});

// GET delete
const album_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: album delete GET");
});

// POST delete
const album_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: album delete POST");
});

// GET update
const album_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: album update GET");
});

// POST update
const album_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: album update POST");
});

module.exports = {
  index,
  album_list,
  album_detail,
  album_create_get,
  album_create_post,
  album_delete_get,
  album_delete_post,
  album_update_get,
  album_update_post,
};
