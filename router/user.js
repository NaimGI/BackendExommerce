const router=require("express").Router();
const {updateUser,getUserById,getAllUser,deleteUser,StateUser}=require("../Controller/user");
const {verfiyToken,verifytokenAuthorization,verifyAdmin} =require("../util/Secure");

router.put("/:id",updateUser);
//DELETE
router.delete("/:id", verifytokenAuthorization, deleteUser);

  //GET USER
  router.get("/find/:id",verifyAdmin,getUserById);
  
  //GET ALL USER
  router.get("/",getAllUser );

router.get("/state",StateUser);

module.exports=router;