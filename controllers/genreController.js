const Genre = require("../models/genre");
const Album = require("../models/album");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const genre_list = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find().exec();

  res.render("genre_list", {
    title: "All Genres",
    genre_list: allGenres,
  });
});

const genre_detail = asyncHandler(async (req, res, next) => {
  const [genre, albumsInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Album.find({ genre: req.params.id }, "name description").exec(),
  ]);

  if (genre === null) {
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }

  res.render("genre_detail", {
    title: "Genre Detail",
    genre: genre,
    genre_albums: albumsInGenre,
  });
});

// GET create
const genre_create_get = asyncHandler(async (req, res, next) => {
  res.render("genre_form", { title: "Create Genre" });
});

// POST create
const genre_create_post = [
  // validate inputs
  body("name", "Genre must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // process reques
  asyncHandler(async (req, res, next) => {
    // extract errors
    const errors = validationResult(req);

    // create new genre object
    const genre = new Genre({ name: req.body.name });

    // return form if there is an error
    if (!errors.isEmpty()) {
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    }

    // check for duplicate genre
    const isDup = await Genre.findOne({ name: req.body.name })
      .collection({ locale: "en", strength: 2 })
      .exec();

    if (isDup) {
      res.redirect(isDup.url);
      return;
    }

    // save the new genre and redirect
    await genre.save();
    res.redirect(genre.url);
  }),
];

// GET delete
const genre_delete_get = asyncHandler(async (req, res, next) => {
  const [genre, albumsInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Album.find({ genre: req.params.id }, "name description").exec(),
  ]);

  if (genre === null) {
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }

  res.render("genre_delete", {
    title: "Delete Genre",
    genre: genre,
    genre_albums: albumsInGenre,
  });
});

// POST delete
const genre_delete_post = asyncHandler(async (req, res, next) => {
  const [genre, albumsInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Album.find({ genre: req.params.id }, "name description").exec(),
  ]);

  if (albumsInGenre > 0) {
    res.render("genre_delete", {
      title: "Delete Genre",
      genre: genre,
      genre_albums: albumsInGenre,
    });
    return;
  }

  // delete if there are no more albums
  await Genre.findByIdAndDelete(req.body.genreid);
  res.redirect("/catalog/genres");
});

// GET update
const genre_update_get = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findById(req.params.id).exec();

  if (genre === null) {
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }

  res.render("genre_form", {
    title: "Update Genre",
    genre: genre,
  });
});

// POST update
const genre_update_post = [
  // validate
  body("name", "Genre must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // handle reques
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // create upated genre
    const genre = new Genre({
      name: req.body.name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("genre_form", {
        title: "Update Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    }

    // update genre
    await Genre.findByIdAndUpdate(req.params.id, genre);
    res.redirect(genre.url);
  }),
];

module.exports = {
  genre_list,
  genre_detail,
  genre_create_get,
  genre_create_post,
  genre_delete_get,
  genre_delete_post,
  genre_update_get,
  genre_update_post,
};
