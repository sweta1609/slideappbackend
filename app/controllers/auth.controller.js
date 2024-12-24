// controllers/authController.js
const axios = require('axios');
const TokenService = require("../services/token.service");
const User=require("../models/user.model")
const Presentation=require("../models/presentation.model")
const Slide = require("../models/slides.model")
const logger = require("../config/logger")
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET =process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;





const handleGoogleLoginCallback=async(req,res)=>{
  try{
    const { code } = req.body;

    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URL,
        grant_type: 'authorization_code',
      },
    });
  
    const { access_token, refresh_token } = tokenResponse.data;
    console.log(tokenResponse.data)
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  
    const { id, name, email,picture,given_name,family_name } = userInfoResponse.data;
    let user = await User.findOne({ googleId: id });
    if (!user) {
      user = new User({
        googleId: id,
        name,
        email,
        given_name,
        family_name,
        profilePicture:picture
      });
      await user.save();
    }

  
    const token = TokenService.tokenSignForUser({ userId: user._id, expiresIn: '1h' });
    res.json({ success: true, token,access_token, refresh_token,});
    logger.info("google logged in")

  }catch(err){
    console.error('Error in Google login callback:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
    logger.error("Unable to login into google");

  }

}




module.exports = {

  handleGoogleLoginCallback,
};
