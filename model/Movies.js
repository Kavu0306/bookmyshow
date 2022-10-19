const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
  },
  screen: {
    type: String,
    required: true,
  },
  languages: {
    type: String,
    required: true,
  },
  certificate: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Movies", movieSchema);
