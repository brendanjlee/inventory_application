const express = require("express");
const router = express.Router();

// require artist controller
const artist_controller = require("../controllers/artistController");

// artist routes //

// GET create
router.get("/create", artist_controller.artist_create_get);

// POST create
router.post("/create", artist_controller.artist_create_post);

// GET delete
router.get("/:id/delete", artist_controller.artist_delete_get);

// POST delete
router.post("/:id/delete", artist_controller.artist_delete_post);

// GET udpate
router.get("/:id/update", artist_controller.artist_update_get);

// POST update
router.get("/:id/update", artist_controller.artist_update_post);

// GET detail
router.get("/:id", artist_controller.artist_detail);

// GET list
router.get("/list", artist_controller.artist_list);

module.exports = router;
