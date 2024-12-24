const asyncHandler=require("express-async-handler")
const jwt = require("jsonwebtoken")
const User=require("../models/user.model");
const config=require("../config/index")


exports.protect= asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        // we will extract token
        token = authHeader.split(" ")[1];
    }
      // Make sure token exists
  if (!token) {
    return next(new Error("Unauthorized", 401));
  }
  try {
    const decoded = jwt.verify(token,config.jwt.secret);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (err) {
    console.log("Inside Error", err);
    return next(new Error("Unauthoriz", 401));
  }

})
