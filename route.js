const authRoute = require("./app/routes/auth.routes");
const presentationRoute = require("./app/routes/presentation.routes");
const looker = require("./app/routes/looker.routes");

function setupRoutes(app) {
  app.use("/auth", authRoute);
  app.use("/presentation", presentationRoute);
  app.use("/looker", looker);
}

module.exports = setupRoutes;
