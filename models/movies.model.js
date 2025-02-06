const mongoose = require("mongoose");

const movieModel = new mongoose.Schema({
  name: String,
  director: String,
  genre: String,
});

const Movies = mongoose.model("Rx2Movie", movieModel)
module.exports = { Movies };