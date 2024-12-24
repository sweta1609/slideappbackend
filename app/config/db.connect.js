
const db = require("../models");
const dbConfig = require("./db.config");

async function connectToMongoDB() {
  try {
    await db.mongoose.connect(dbConfig.dbConnect, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB");

    // Handle MongoDB connection errors
    db.mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    db.mongoose.connection.on("disconnected", () => {
      console.log("MongoDB connection disconnected.");
    });

    // Close MongoDB connection on app termination
    process.on("SIGINT", async () => {
      await db.mongoose.connection.close();
      console.log("MongoDB connection closed through app termination.");
      process.exit(0);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

module.exports = connectToMongoDB;
