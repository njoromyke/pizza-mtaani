const mongoose = require("mongoose");

const basicToppingSchema = new mongoose.Schema({
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

const basicTopping = mongoose.model("basicTopping", basicToppingSchema);

module.exports = basicTopping;
