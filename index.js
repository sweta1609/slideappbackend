const dotenv = require("dotenv");
dotenv.config(
  { path: "./app/config/.env" }
 );
const express = require("express");
const connectToMongoDB=require('./app/config/db.connect')
const cors = require("cors");
const setupRoutes=require("./route")
const logger =require("./app/config/logger")


connectToMongoDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use(cors())
const port = process.env.PORT || 8000;

setupRoutes(app)

try {
    app.listen(port, () => console.log(`Listening on port ${port}...`));
    logger.info("server working")
  } catch (error) {
    console.error("Server startup error:", error);
    logger.error("server startup error")
  }