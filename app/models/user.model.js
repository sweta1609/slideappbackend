const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    given_name: {
      type: String,
    },
    family_name: {
      type: String,
    },
    name:{
       type:String
    },
    email: {
      type: String,
      match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/],
      index: true,
      unique: true,
    },
    profilePicture: {
      type: String,
    },
    noOfPpts: {
      type: Number,
      default: 0,
    },
    lookerIntegration: {
      type: Number,
      default: 0,
    },
    noOfMetrics: {
      type: Number,
      default: 0,
    },
    status: {
      type: String, 
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
