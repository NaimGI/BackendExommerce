const router=require("express").Router();
const {RegisterAuth,Loginauth} = require("../Controller/auth.js");

router.post("/register",RegisterAuth);
router.post("/Login",Loginauth);

module.exports=router;