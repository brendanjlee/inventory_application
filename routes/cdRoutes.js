const express = require("express");
const router = express.Router();

// require cd controller
const cd_controller = require("../controllers/cdController");

// cd routes //

// GET create
router.get("/create", cd_controller.cd_create_get);

// POST create
router.post("/create", cd_controller.cd_create_post);

// GET delete
router.get("/:id/delete", cd_controller.cd_delete_get);

// POST delete
router.post("/:id/delete", cd_controller.cd_delete_post);

// GET udpate
router.get("/:id/update", cd_controller.cd_update_get);

// POST update
router.get("/:id/update", cd_controller.cd_update_post);

// GET detail
router.get("/:id", cd_controller.cd_detail);

// GET list
router.get("/", cd_controller.cd_list);

module.exports = router;
