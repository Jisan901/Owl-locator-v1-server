const mongoose = require('mongoose');
const { Schema } = mongoose;

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    admin: {
      name:String,
      email:String
    },
    adminId:String,
    id: {
      type: String,
      required: true,
      unique:true
    },
    picture:{
        type:String,
        required:true
    },
    members:[{
        id:String,
        state:{
            type:String,
            default:"requested",
            enum:["requested","blocked","member"]
        }
    }],
    chats:[
        {
            uid:String,
            message:String,
            time:String
        }
        ]
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;