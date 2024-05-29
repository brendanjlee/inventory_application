const Artist = require("../models/artist");
const asyncHandler = require("express-async-handler");

// GET list
const artist_list = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: Artist List");
});

// GET detail
const artist_detail = asyncHandler(async (req, res, next) => {
  res.send(`Not Implemented: Artist detail: ${req.params.id}`);
});

// GET create
const artist_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: Artist create get");
});

// POST create
const artist_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: Artist create post");
});

// GET delete
const artist_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: artist delete GET");
});

// POST delete
const artist_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: artist delete POST");
});

// GET update
const artist_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: artist update GET");
});

// POST update
const artist_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: artist update POST");
});

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
