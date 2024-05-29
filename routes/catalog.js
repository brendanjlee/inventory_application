var express = require("express");
var router = express.Router();

const albumController = require("../controllers/albumController");

// import catalog routes
const artistRoutes = require("./artistRoutes");
const albumRoutes = require("./albumRoutes");
const genreRoutes = require("./genreRoutes");
const songRoutes = require("./songRoutes");
const cdRoutes = require("./cdRoutes");

// index page
router.get("/catalog", albumController.index);

// put routes under /catalog
router.use("/catalog/artists", artistRoutes);
router.use("/catalog/albums", albumRoutes);
router.use("/catalog/genres", genreRoutes);
router.use("/catalog/songs", songRoutes);
router.use("/catalog/cd", cdRoutes);

module.exports = router;
