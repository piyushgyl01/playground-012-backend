const mongoose = require();

const movieModel = new mongoose.Schema({
  name: String,
  director: String,
  genre: String,
});

module.exports = mongoose.model("Rx2Movie", movieModel)