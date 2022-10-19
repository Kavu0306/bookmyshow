const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
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
  certificates: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Admin", adminSchema);
