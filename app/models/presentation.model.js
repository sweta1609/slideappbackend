const mongoose = require('mongoose');

const presentationSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
      },
      slides: [{
        id:String,
        name:String,
        embedUrl:String
      }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const User = mongoose.model('Presntation',presentationSchema);

module.exports = User;