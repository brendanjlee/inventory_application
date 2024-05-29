const express = require("express");
const router = express.Router();

// require song controller
const song_controller = require("../controllers/songController");

// song routes //

// GET create
router.get("/create", song_controller.song_create_get);

// POST create
router.post("/create", song_controller.song_create_post);

// GET delete
router.get("/:id/delete", song_controller.song_delete_get);

// POST delete
router.post("/:id/delete", song_controller.song_delete_post);

// GET udpate
router.get("/:id/update", song_controller.song_update_get);

// POST update
router.get("/:id/update", song_controller.song_update_post);

// GET detail
router.get("/:id", song_controller.song_detail);

// GET list
router.get("/", song_controller.song_list);

module.exports = router;
