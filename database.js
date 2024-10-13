const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected: " + conn.connection.host);
  } catch (error) {
    console.log("error on connecting to database", error);
    // process.exit(0);
  }
};
