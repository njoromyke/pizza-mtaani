const mongoose = require("mongoose");
const { CONFIG } = require("../utils/constants");

exports.connectDb = async () => {
  try {
    const conn = await mongoose.connect(CONFIG.MONGO_URI, {});

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
