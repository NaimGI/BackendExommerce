const Card = require("../models/Card");

exports.Createproducts=async(req,res,next)=>{
    const newCard=new Card(req.body);
    try {
        const saveCard =await newCard.save();
        res.status(200).json(saveCard );
    } catch (error) {
        next(error);
    }
}

//UPDATE
exports.updateCart=async (req, res,next) => {
  try {
    const updatedCart = await Card.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    next(err);
  }
}
exports.getUserIdCard=async(req,res,next)=>{
    try {
        const CardData=await Card.findOne({userId: req.params.userId });
        res.status(200).json(CardData);
    } catch (error) {
        next(error);
    }

}
//DELETE
exports.deleteCard = async (req, res,next) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    next(err);
  }
}

exports.getAllCart=async(req,res,next)=>{
  try {
    const carts=await Card.find();
    res.status(200).json(carts);
  } catch (error) {
    
  }
}