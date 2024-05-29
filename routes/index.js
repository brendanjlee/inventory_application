var express = require("express");
var router = express.Router();
const albumController = require("../controllers/albumController");

// import catalog routes
const artistRoutes = require("./artistRoutes");
const albumRoutes = require("./albumRoutes");
const genreRoutes = require("./genreRoutes");
const songRoutes = require("./songRoutes");
const cdRoutes = require("./cdRoutes");

router.use("/catalog/artists", artistRoutes);
router.use("/catalog/albums", albumRoutes);
router.use("/catalog/genres", genreRoutes);
router.use("/catalog/songs", songRoutes);
router.use("/catalog/cd", cdRoutes);

router.get("/catalog", albumController.index);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/catalog");
});

module.exports = router;
