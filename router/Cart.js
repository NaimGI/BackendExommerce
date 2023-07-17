const router=require("express").Router();
const {verfiyToken,verifytokenAuthorization,verifyAdmin} =require("../util/Secure");
const {Createproducts,updateCart,getUserIdCard,getAllCart,deleteCard}=require("../Controller/Cart");

router.post("/addCard",Createproducts);
router.put("/:id",updateCart)
router.get("/find/:userId",getUserIdCard);
router.get("/",getAllCart);
router.delete("/:id",deleteCard)


module.exports=router;