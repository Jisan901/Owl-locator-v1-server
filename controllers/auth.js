const User = require("../models/User");

module.exports.login = async (req,res)=>{
    try{
        const authHeader = req.headers.authorization;
        const decoded = req.decoded;
        //save user 
        const existed = await User.findOne({email:req.decoded.email,uid:req.decoded.uid});
        if (!existed) {
            const brandNew = new User({
                username:decoded.name,
                email:decoded.email,
                uid:decoded.uid,
                picture:decoded.picture
            })
            brandNew.save()
        }
        // same with firebase exp
        res.json({status:"ok",decoded});
    }
    catch(e){
        res.status(501).send(e.message)
    }
};