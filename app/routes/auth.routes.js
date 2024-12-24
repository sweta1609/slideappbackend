// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {

  handleGoogleLoginCallback} = require('../controllers/auth.controller');

router.route('/google/callback').post(handleGoogleLoginCallback);




module.exports = router;
