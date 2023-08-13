const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique:false
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    uid: {
      type: String,
      required: true,
      unique:true
    },
    picture:{
        type:String,
        required:true
    },
    groups:{
        type:[String],
        default:[]
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;