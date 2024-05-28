const CD = require("../models/cd");
const asyncHandler = require("express-async-handler");

const cd_list = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: cd List");
});

const cd_detail = asyncHandler(async (req, res, next) => {
  res.send(`Not Implemented: cd detail: ${req.params.id}`);
});

// GET create
const cd_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: cd create get");
});

// POST create
const cd_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not Implemented: cd create post");
});

// GET delete
const cd_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: cd delete GET");
});

// POST delete
const cd_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: cd delete POST");
});

// GET update
const cd_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: cd update GET");
});

// POST update
const cd_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: cd update POST");
});

module.exports = {
  cd_list,
  cd_detail,
  cd_create_get,
  cd_create_post,
  cd_delete_get,
  cd_delete_post,
  cd_update_get,
  cd_update_post,
};
