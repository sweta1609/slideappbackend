const express = require("express");
const router = express.Router();
const {
  getLookerDashboards,
  getLookerSingleDashboard,
  downloadLookImage,
} = require("../controllers/looker.controller");
const { protect } = require("../middlewares/validateTokenHandler");

router.route("/dashboards").get(protect, getLookerDashboards);
router.route("/dashboard/:id").get(protect, getLookerSingleDashboard);
router.route("/downloadlook/:id").get(protect, downloadLookImage);

module.exports = router;
