const mongoose = require("mongoose");

const deluxeToppingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  size: {
    type: String,
    required: true,
  },
});

const DeluxeTopping = mongoose.model("DeluxeTopping", deluxeToppingSchema);

module.exports = DeluxeTopping;
