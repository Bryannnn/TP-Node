const express = require("express");
const router = express.Router();
const SongRouter = require("./song.router");
const API_SONGS = `/songs`;

router.use(API_SONGS, SongRouter);

module.exports = router;
