const bcrypt =require("bcryptjs")
const Product =require("../Models/products");

exports.Createproducts=async(req,res,next)=>{
    const newProducts=new Product(req.body);
    try {
        const saveProduct=await newProducts.save();
        res.status(200).json(saveProduct);
    } catch (error) {
        next(error);
    }

}

exports.updateUser=async (req,res,next)=>{
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.ProdectId,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedProduct);
        
    } catch (error) {
        next(error);
    }
}
exports.deleteProduct=async(req,res,next)=>{
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
}
exports.getUserById=async(req,res,next)=>{
  try {
    const produtDb = await Product.findById(req.params.id);
    res.status(200).json(produtDb);
  } catch (err) {
    next(err);
  }
}
exports.getAllproduct=async(req,res,next)=>{
    const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
}
/*



exports.getAllUser=async(res,req,next)=>{
 
    const query = req.query.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  
}

exports.StateUser=async(req,res,next)=>{
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
}*/