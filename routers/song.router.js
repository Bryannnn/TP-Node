const express = require("express");
const songRouter = express.Router();
const SongController = require("../controllers/song.controller");
const { validate } = require("express-validation");
const SongValidator = require("../validators/song.validators");

const API_SONGS_PARAM = `/:id`;
const API_SONGS_QUERY = `/artists`;

// Begin Router
songRouter
  .route("/")
  .get(SongController.findAll)
  .post(validate(SongValidator.validateCreate), SongController.create);

songRouter.route(API_SONGS_QUERY).get(SongController.findByName);

songRouter
  .route(API_SONGS_PARAM)
  .get(SongController.findById)
  .put(validate(SongValidator.validateUpdate), SongController.update)
  .delete(SongController.delete);

// end Router
module.exports = songRouter;
