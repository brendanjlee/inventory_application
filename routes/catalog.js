var express = require("express");
var router = express.Router();

const artist_controller = require("../controllers/artistController");
const album_controller = require("../controllers/albumController");
const song_controller = require("../controllers/songController");
const genre_controller = require("../controllers/genreController");
const cd_controller = require("../controllers/cdController");

// Home page
router.get("/", album_controller.index);

// album routes //
// GET create
router.get("/album/create", album_controller.album_create_get);

// POST create
router.post("/album/create", album_controller.album_create_post);

// GET delete
router.get("/album/:id/delete", album_controller.album_delete_get);

// POST delete
router.post("/album/:id/delete", album_controller.album_delete_post);

// GET udpate
router.get("/album/:id/update", album_controller.album_update_get);

// POST update
router.get("/album/:id/update", album_controller.album_update_post);

// GET detail
router.get("/album/:id", album_controller.album_detail);

// GET list
router.get("/albums", album_controller.album_list);

// artist routes //
// GET create
router.get("/artist/create", artist_controller.artist_create_get);

// POST create
router.post("/artist/create", artist_controller.artist_create_post);

// GET delete
router.get("/artist/:id/delete", artist_controller.artist_delete_get);

// POST delete
router.post("/artist/:id/delete", artist_controller.artist_delete_post);

// GET udpate
router.get("/artist/:id/update", artist_controller.artist_update_get);

// POST update
router.get("/artist/:id/update", artist_controller.artist_update_post);

// GET detail
router.get("/artist/:id", artist_controller.artist_detail);

// GET list
router.get("/artists", artist_controller.artist_list);

// Song Routes //
// GET create
router.get("/song/create", song_controller.song_create_get);

// POST create
router.post("/song/create", song_controller.song_create_post);

// GET delete
router.get("/song/:id/delete", song_controller.song_delete_get);

// POST delete
router.post("/song/:id/delete", song_controller.song_delete_post);

// GET udpate
router.get("/song/:id/update", song_controller.song_update_get);

// POST update
router.get("/song/:id/update", song_controller.song_update_post);

// GET detail
router.get("/song/:id", song_controller.song_detail);

// GET list
router.get("/songs/", song_controller.song_list);

// CD routes //
// GET create
router.get("/cd/create", cd_controller.cd_create_get);

// POST create
router.post("/cd/create", cd_controller.cd_create_post);

// GET delete
router.get("/cd/:id/delete", cd_controller.cd_delete_get);

// POST delete
router.post("/cd/:id/delete", cd_controller.cd_delete_post);

// GET udpate
router.get("/cd/:id/update", cd_controller.cd_update_get);

// POST update
router.get("/cd/:id/update", cd_controller.cd_update_post);

// GET detail
router.get("/cd/:id", cd_controller.cd_detail);

// GET list
router.get("/cds", cd_controller.cd_list);

// Genre Routes //
// GET create
router.get("/genre/create", genre_controller.genre_create_get);

// POST create
router.post("/genre/create", genre_controller.genre_create_post);

// GET delete
router.get("/genre/:id/delete", genre_controller.genre_delete_get);

// POST delete
router.post("/genre/:id/delete", genre_controller.genre_delete_post);

// GET udpate
router.get("/genre/:id/update", genre_controller.genre_update_get);

// POST update
router.get("/genre/:id/update", genre_controller.genre_update_post);

// GET detail
router.get("/genre/:id", genre_controller.genre_detail);

// GET list
router.get("/genres", genre_controller.genre_list);

module.exports = router;
