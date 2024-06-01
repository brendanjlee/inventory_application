const Album = require("../models/album");
const Artist = require("../models/artist");
const CD = require("../models/cd");
const Song = require("../models/song");
const Genre = require("../models/genre");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
  const [album, songsInAlbum] = await Promise.all([
    Album.findById(req.params.id).populate("artist genre").exec(),
    Song.find({ album: req.params.id }, "name duration").exec(),
  ]);

  if (album === null) {
    const err = new Error("Album not found");
    err.status = 404;
    return next(err);
  }

  res.render("album_detail", {
    title: "Album Detail",
    album: album,
    album_songs: songsInAlbum,
  });
});

// GET create
const album_create_get = asyncHandler(async (req, res, next) => {
  // get all artists and genres
  const [allArtists, allGenres] = await Promise.all([
    Artist.find().sort({ name: 1 }).exec(),
    Genre.find().sort({ name: 1 }).exec(),
  ]);

  res.render("album_form", {
    title: "Create Album",
    artists: allArtists,
    genres: allGenres,
  });
});

// POST create
const album_create_post = [
  // validate
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name cannot be empty"),
  body("description").trim().isLength({ min: 1 }).escape(),
  body("release").isISO8601().toDate(),

  // process
  asyncHandler(async (req, res, next) => {
    // extract errors
    const errors = validationResult(req);

    const album = new Album({
      name: req.body.name,
      description: req.body.description,
      release: req.body.release,
      artist: req.body.artist,
      genre: req.body.genre,
    });

    if (!errors.isEmpty()) {
      const [allArtists, allGenres] = await Promise.all([
        Artist.find().sort({ name: 1 }).exec(),
        Genre.find().sort({ name: 1 }).exec(),
      ]);

      res.render("album_form", {
        title: "Create Album",
        album: album,
        artists: allArtists,
        genres: allGenres,
        errors: errors.array(),
      });
      return;
    }

    // check for duplicate
    const isDup = await Album.findOne({ name: req.body.name })
      .collation({ locale: "en", strength: 2 })
      .exec();

    if (isDup) {
      res.redirect(isDup.url);
      return;
    }

    await album.save();
    res.redirect(album.url);
  }),
];

// GET delete
const album_delete_get = asyncHandler(async (req, res, next) => {
  // delete all songs in the album
  const [album, songsInAlbum] = await Promise.all([
    Album.findById(req.params.id).exec(),
    Song.find({ album: req.params.id }, "name").exec(),
  ]);

  if (album === null) {
    const err = new Error("Album not found");
    err.status = 404;
    return next(err);
  }

  res.render("album_delete", {
    title: "Delte Album",
    album: album,
    album_songs: songsInAlbum,
  });
});

// POST delete
const album_delete_post = asyncHandler(async (req, res, next) => {
  const [album, songsInAlbum] = await Promise.all([
    Album.findById(req.params.id).exec(),
    Song.find({ album: req.params.id }, "name").exec(),
  ]);

  // delete all songs
  songsInAlbum.forEach(async (song) => {
    await Song.findByIdAndDelete(song._id);
  });

  // delete album
  await Album.findByIdAndDelete(req.body.albumid);
  res.redirect("/catalog/albums");
});

// GET update
const album_update_get = asyncHandler(async (req, res, next) => {
  const [album, allArtists, allGenres] = await Promise.all([
    Album.findById(req.params.id).exec(),
    Artist.find().sort({ name: 1 }).exec(),
    Genre.find().sort({ name: 1 }).exec(),
  ]);

  if (album === null) {
    const err = new Error("Album not found");
    err.status = 404;
    return next(err);
  }

  res.render("album_form", {
    title: "Update Album",
    album: album,
    artists: allArtists,
    genres: allGenres,
  });
});

// POST update
const album_update_post = [
  // validate
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name cannot be empty"),
  body("description").trim().isLength({ min: 1 }).escape(),
  body("release").isISO8601().toDate(),

  asyncHandler(async (req, res, next) => {
    console.log("hello");
    const errors = validationResult(req);

    const album = new Album({
      name: req.body.name,
      description: req.body.description,
      release: req.body.release,
      artist: req.body.artist,
      genre: req.body.genre,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const [allArtists, allGenres] = await Promise.all([
        Artist.find().sort({ name: 1 }).exec(),
        Genre.find().sort({ name: 1 }).exec(),
      ]);

      res.render("album_form", {
        title: "Create Album",
        album: album,
        artists: allArtists,
        genres: allGenres,
        errors: errors.array(),
      });
      return;
    }

    // update
    await Album.findByIdAndUpdate(req.params.id, album);
    res.redirect(album.url);
  }),
];

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
