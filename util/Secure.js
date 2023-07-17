const jwt=require("jsonwebtoken");


const verfiyToken=(req,res,next)=>{
    try {
        authHeadres=req.headers.token;
        if(authHeadres){
      const token =authHeadres.split(" ")[1];
     jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
    if(err) res.status(403).json("Token is not valid !");
     req.user=user;
     res.status(200).json(user);
       next()
     });
   }else{
    return res.status(401).json("You are not authenticated!");
        }
        
    } catch (error) {
        next(error);
    }
}
const verifytokenAuthorization=(res,req,next)=>{
    verfiyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403).json("You are not alowed to do that!")
        }
    })
}

const verifyAdmin=(req,res,next)=>{
    verfiyToken(req,res,()=>{
        try {
            if(req.user.isAdmin){
                next()
            }
        } catch (error) {
            next(error);
        }
    });
}
module.exports={verifyAdmin,verifytokenAuthorization,verfiyToken}