const express = require("express");
const router = express.Router();

// require album controller
const album_controller = require("../controllers/albumController");

// album routes //

// GET create
router.get("/create", album_controller.album_create_get);

// POST create
router.post("/create", album_controller.album_create_post);

// GET delete
router.get("/:id/delete", album_controller.album_delete_get);

// POST delete
router.post("/:id/delete", album_controller.album_delete_post);

// GET udpate
router.get("/:id/update", album_controller.album_update_get);

// POST update
router.get("/:id/update", album_controller.album_update_post);

// GET detail
router.get("/:id", album_controller.album_detail);

// GET list
router.get("/", album_controller.album_list);

module.exports = router;
