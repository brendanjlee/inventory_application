const express = require("express");
const router = express.Router();

// require genre controller
const genre_controller = require("../controllers/genreController");

// genre routes //

// GET create
router.get("/create", genre_controller.genre_create_get);

// POST create
router.post("/create", genre_controller.genre_create_post);

// GET delete
router.get("/:id/delete", genre_controller.genre_delete_get);

// POST delete
router.post("/:id/delete", genre_controller.genre_delete_post);

// GET udpate
router.get("/:id/update", genre_controller.genre_update_get);

// POST update
router.get("/:id/update", genre_controller.genre_update_post);

// GET detail
router.get("/:id", genre_controller.genre_detail);

// GET list
router.get("/", genre_controller.genre_list);

module.exports = router;
