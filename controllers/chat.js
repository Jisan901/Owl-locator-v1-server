const Group = require("../models/Group");

module.exports.saveLog=async function(req,res) {
    const user = req.decoded;
    const data = req.body;
    let result = await Group.updateOne({id:data.gid,"members.id":user.uid,"members.state":'member'},{
        $push:{
            chats:{
                uid:user.uid,
                message:data.message,
                time:new Date().toTimeString().split(' ')[0]
            }
        }
    })
    res.send({data})
}

module.exports.getLog=function(req,res) {
    
}