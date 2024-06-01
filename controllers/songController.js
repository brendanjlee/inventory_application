const Song = require("../models/song");
const Album = require("../models/album");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
  const song = await Song.findById(req.params.id).populate("album").exec();

  if (song === null) {
    const err = new Error("Song not found");
    err.status = 404;
    return next(err);
  }

  res.render("song_detail", {
    title: "Song Detail",
    song: song,
  });
});

// GET create
const song_create_get = asyncHandler(async (req, res, next) => {
  const allAlbums = await Album.find()
    .sort({ name: 1 })
    .populate("artist")
    .exec();

  console.log(allAlbums);

  res.render("song_form", {
    title: "Create Song",
    albums: allAlbums,
  });
});

// POST create
const song_create_post = [
  // validate
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name cannot be empty"),
  body("duration").trim().escape(),

  // process
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const song = new Song({
      name: req.body.name,
      duration: req.body.duration,
      album: req.body.album,
    });

    if (!errors.isEmpty()) {
      const allAlbums = await Album.find()
        .sort({ name: 1 })
        .populate("artist")
        .exec();

      res.render("song_form", {
        title: "Create Song",
        song: song,
        albums: allAlbums,
        errors: errors.array(),
      });
      return;
    }

    // check for duplicate
    const isDup = await Song.findOne({
      name: req.body.name,
      album: req.body.album,
    });

    if (isDup) {
      res.redirect(isDup.url);
      return;
    }

    await song.save();
    res.redirect(song.url);
  }),
];

// GET delete
const song_delete_get = asyncHandler(async (req, res, next) => {
  const song = await Song.findById(req.params.id).exec();

  if (song === null) {
    const err = new Error("Song not found");
    err.status = 404;
    return next(err);
  }

  res.render("song_delete", {
    title: "Song Delete",
    song: song,
  });
});

// POST delete
const song_delete_post = asyncHandler(async (req, res, next) => {
  const song = await Song.findById(req.params.id).exec();

  if (song === null) {
    const err = new Error("Song not found");
    err.status = 404;
    return next(err);
  }

  await Song.findByIdAndDelete(req.body.songid);
  res.redirect("/catalog/songs");
});

// GET update
const song_update_get = asyncHandler(async (req, res, next) => {
  const [song, allAlbums] = await Promise.all([
    Song.findById(req.params.id).exec(),
    Album.find().sort({ name: 1 }).exec(),
  ]);

  if (song === null) {
    const err = new Error("Song not found");
    err.status = 404;
    return next(err);
  }

  res.render("song_form", {
    title: "Update Song",
    song: song,
    albums: allAlbums,
  });
});

// POST update
const song_update_post = [
  // validate
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name cannot be empty"),
  body("duration").trim().escape(),

  // process
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const song = new Song({
      name: req.body.name,
      duration: req.body.duration,
      album: req.body.album,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const allAlbums = await Album.find()
        .sort({ name: 1 })
        .populate("artist")
        .exec();

      res.render("song_form", {
        title: "Create Song",
        song: song,
        albums: allAlbums,
        errors: errors.array(),
      });
      return;
    }

    // update
    await Song.findByIdAndUpdate(req.params.id, song);
    res.redirect(song.url);
  }),
];

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
