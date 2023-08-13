const Group = require("../models/Group");
const User = require("../models/User");


module.exports.createGroup=async (req,res)=>{
    try{
        const user = req.decoded;
        const groupName = req.body.groupName;
        const isExist = await Group.findOne({name:groupName})
        if (!isExist && groupName) {
            const newGroup = new Group({
                name:groupName,
                admin:{
                    name:user.name,
                    email:user.email
                },
                adminId:user.uid,
                id:Date.now().toString(),
                picture:user.picture,
                members:[{id:user.uid,state:"member"}]
            });
            newGroup.save();
            return res.send({message:"group created"});
        }
        res.status(404).send({message:"group not created"});
    }
    catch(e){
        res.status(501).send(e.message);
    }
}


module.exports.myGroups= async (req,res)=>{
    try{
        const user = req.decoded;
        const groups = await Group.find({"members.id":user.uid});
        let final = groups.map(group=>{
            // just requsted user info
            let firstindex = group.members.find(member=>user.uid===member.id)
            let temp = Array.from(Array(group.members.length)).map((e,i)=>i)
            temp[0] = firstindex;
            group.members=temp;
            return group
            // [thisUser,1,2,3,4,5,6,7,...]
        });
        res.send(final);
    }
    catch(e){
        res.status(501).send(e.message);
    }
}






module.exports.getById= async (req,res)=>{
    try{
        const user = req.decoded;
        const id = req.params.id;
        const group = await Group.findOne({id,"members.id":user.uid});
        if (group) {
            let Userdata = group.members.map(data=>data.id)
            let users = await User.find({uid:Userdata},{groups:0,_id:0})
            let newmembers = group.members.map(member=>{
                let userl = users.find(usr=>usr.uid===member.id)
                return {
                    state:member?.state,
                    id:member?.id,
                    name:userl?.username,
                    picture:userl?.picture,
                    email:userl?.email
                }
            })
            if (group.adminId===user.uid) {
                newmembers = newmembers
            }
            else{
                let currentUser = newmembers.find(e=>e.id===user.uid);
                if (currentUser?.state==="member") {
                    
                newmembers = newmembers.filter(mem=>mem.state==="member")
                }
                else {
                    return res.status(403).send({message:"forbidden access"})
                }
            }
            group2 = group.toJSON()
            group2.members=newmembers
            res.send(group2);
        }
        else res.status(403).send({message:"forbidden access"})
    }
    catch(e){
        res.status(501).send(e.message);
    }
}






module.exports.searchById= async (req,res)=>{
    try{
        const user = req.decoded;
        const id = req.params.id;
        const group = await Group.findOne({id});
        // just requsted user info
        let isIn = group.members.find(member=>member.id===user.uid)
        let temp = Array.from(Array(group.members.length)).map((e,i)=>i)
        temp[0] = isIn;
        group2 = group.toJSON()
        group2.members=temp
        res.send([group2]);
    }
    catch(e){
        res.status(501).send(e.message);
    }
}


module.exports.createRequest= async (req,res)=>{
    try{
        const user = req.decoded;
        const groupId = req.params.id;
        
        const result = await Group.updateOne({id:groupId,"members.id":{$ne:user.uid}},{$push:{
            members:{
                id:user.uid,
                state:"requested"
            }
        }})
        console.log(result);
        res.send(result)
    }
    catch(e){
        res.status(501).send(e.message);
    }
}


function smallTypeHandler(type) {
    switch (type) {
        case 'block':
            return "blocked"
            break;
        case 'accept':
            return "member"
            break;
        case 'remove':
            return "resolved"
            break;
        default:
            return "requested"
    }
}

module.exports.answerRequest= async (req,res)=>{
    try {
        const user = req.decoded;
        const gid = req.params.id;
        const data = req.body;
        console.log(gid,data);
        const group = await Group.findOne({id:gid});
        if (group.adminId===user.uid) {
            
            let typeExchange = smallTypeHandler(data.type)
            console.log(typeExchange);
            
            if (typeExchange!=='resolved') {
                let result= await Group.updateOne({id:gid},{
                    $set:{
                        "members.$[memid].state":typeExchange
                    }
                },{arrayFilters: [
                        {"memid.id": data.uid}
                ]})
                console.log(result);
                return res.send({message:"updated"})
            }
            else{
                let result = await Group.updateOne({id:gid},{
                    $pull:{members:{id:data.uid}}
                })
                console.log(result);
                return res.send({message:"removed"})
            }
        }
        res.status(404).send({message:"author not found"})
        
    } catch (e) {
        res.status(501).send(e.message);
    }
}