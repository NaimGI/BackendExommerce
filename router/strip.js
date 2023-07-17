const stripe=require("stripe")(process.env.STRIP_KEY);
const router = require("express").Router();


router.post("/payment",(res,req)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"usd"
    },(stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr);
        }else{
            res.status(200).json(stripeRes);
        }
    })
});

module.exports=router;
