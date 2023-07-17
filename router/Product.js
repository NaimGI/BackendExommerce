const router=require("express").Router();
const {Createproducts,updateUser,deleteProduct,getUserById,getAllproduct} =require("../Controller/Product");
const {verfiyToken,verifytokenAuthorization,verifyAdmin} =require("../util/Secure");

router.post("/addProduct",Createproducts);
router.put("/:ProdectId",updateUser);
router.delete("/delete/:id",deleteProduct);
router.get("/find/:id",getUserById);
router.get("/",getAllproduct)


module.exports=router;