const Genre = require("../models/genre");
const asyncHandler = require("express-async-handler");

const genre_list = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: genre List");
});

const genre_detail = asyncHandler(async (req, res, next) => {
  res.send(`Not Implemented: genre detail: ${req.params.id}`);
});

// GET create
const genre_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: genre create get");
});

// POST create
const genre_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: genre create post");
});

// GET delete
const genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: genre delete GET");
});

// POST delete
const genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: genre delete POST");
});

// GET update
const genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: genre update GET");
});

// POST update
const genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: genre update POST");
});

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
