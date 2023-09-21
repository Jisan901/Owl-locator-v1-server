var admin = require("firebase-admin");
var serviceAccount = require("../../owl-locator-firebase-adminsdk-2jvtl-cf6f40b25b.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports.verifyToken=verifyFirebaseSdk;


const tokenDecoder = (token)=>{
    return admin.auth().verifyIdToken(token);
}
module.exports.tokenDecoder = tokenDecoder;

function verifyFirebaseSdk(req,res,next){
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({message:'unauthorized access header not found'})
        }
        const token = authHeader.split(' ')[1]
        if (!token) {
            return res.status(403).send({message:'forbidden header null'})
        }
        tokenDecoder(token)
        .then(decoded => {
            req.decoded=decoded;
            return next()
        })
        .catch(err=>{
            res.status(403).send({message:'forbidden access header expired'})
        })
    }
    catch(e){
        res.status(501).send(e.message)
    }
}


module.exports.verifyCookie=function(req,res,next){
    try{
        const token=req.cookies?.idtokencookie;
        if (token) {
            tokenDecoder(token)
            .then(decoded => {
                req.decoded=decoded;
                next()
            })
            .catch(err=>{
                return res.status(401).send({message:'unauthorized access invalid token response'})
            })
        }else{
            res.status(403).send({message:'forbidden access cookies not found'})
        }
    }
    catch(e){
        res.status(501).send(e.message)
    }
}