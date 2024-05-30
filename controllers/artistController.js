const Album = require("../models/album");
const Artist = require("../models/artist");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// GET list
const artist_list = asyncHandler(async (req, res, next) => {
  // res.send("artist list not iggmplemented");
  const allArtists = await Artist.find().sort({ name: 1 }).exec();

  res.render("artist_list", {
    title: "All Artists",
    artist_list: allArtists,
  });
});

// GET detail
const artist_detail = asyncHandler(async (req, res, next) => {
  const [artist, albumsByArtist] = await Promise.all([
    Artist.findById(req.params.id).exec(),
    Album.find({ artist: req.params.id }, "name description release").exec(),
  ]);

  if (artist === null) {
    const err = new Error("Artist not found");
    err.status = 404;
    return next(err);
  }

  res.render("artist_detail", {
    title: "Artist Detail",
    artist: artist,
    artist_albums: albumsByArtist,
  });
});

// GET create
const artist_create_get = asyncHandler(async (req, res, next) => {
  res.render("artist_form", { title: "Create Artist" });
});

// POST create
const artist_create_post = [
  // validation
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name cannnot be empty"),
  body("description").trim().isLength({ min: 1 }).escape(),
  body("debut").isISO8601().toDate(),

  // process requests
  asyncHandler(async (req, res, next) => {
    // extract errors
    const errors = validationResult(req);

    // create new artist object
    const artist = new Artist({
      name: req.body.name,
      description: req.body.description,
      debut: req.body.debut,
    });

    // return if error
    if (!errors.isEmpty()) {
      res.render("artist_form", {
        title: "Create Artist",
        artist: artist,
        errors: errors.array(),
      });
      return;
    }

    // check for duplicate
    const isDup = await Artist.findOne({ name: req.body.name })
      .collection({ locale: "en", strength: 2 })
      .exec();
    if (isDup) {
      res.redirect(isDup.url);
      return;
    }

    await artist.save();
    res.redirect(artist.url);
  }),
];

// GET delete
const artist_delete_get = asyncHandler(async (req, res, next) => {
  // artist should check if there are no albums, albums shoudl check there are no songs
  const [artist, albumsByArtist] = await Promise.all([
    Artist.findById(req.params.id).exec(),
    Album.find({ artist: req.params.id }, "name description release").exec(),
  ]);

  if (artist === null) {
    const err = new Error("Artist not found");
    err.status = 404;
    return next(err);
  }

  res.render("artist_delete", {
    title: "Delete Artist",
    artist: artist,
    artist_albums: albumsByArtist,
  });
});

// POST delete
const artist_delete_post = asyncHandler(async (req, res, next) => {
  const [artist, albumsByArtist] = await Promise.all([
    Artist.findById(req.params.id).exec(),
    Album.find({ artist: req.params.id }, "name description release").exec(),
  ]);

  if (albumsByArtist > 0) {
    res.render("artist_delete", {
      title: "Delete Artist",
      artist: artist,
      artist_albums: albumsByArtist,
    });
    return;
  }

  // delete if there are no albums
  await Artist.findByIdAndDelete(req.body.artistid);
  res.redirect("/catalog/artists");
});

// GET update
const artist_update_get = asyncHandler(async (req, res, next) => {
  const artist = await Artist.findById(req.params.id).exec();

  if (artist === null) {
    const err = new Error("Artist not found");
    err.status = 404;
    return next(err);
  }

  res.render("artist_form", {
    title: "Update Artist",
    artist: artist,
  });
});

// POST update
const artist_update_post = [
  // validate
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name cannnot be empty"),
  body("description").trim().isLength({ min: 1 }).escape(),
  body("debut").isISO8601().toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // create updated artist
    const artist = new Artist({
      name: req.body.name,
      description: req.body.description,
      debut: req.body.debut,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("artist_form", {
        title: "Update Artist",
        artist: artist,
        errors: errors.array(),
      });
      return;
    }

    // update artist
    await Artist.findByIdAndUpdate(req.params.id, artist);
    res.redirect(artist.url);
  }),
];

module.exports = {
  artist_list,
  artist_detail,
  artist_create_get,
  artist_create_post,
  artist_delete_get,
  artist_delete_post,
  artist_update_get,
  artist_update_post,
};
