const Album = require("../models/album");
const asyncHandler = require("express-async-handler");

const index = asyncHandler(async (req, res, next) => {
  res.send("NOT Implemented: Site Home Page");
});

const album_list = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: album List");
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
