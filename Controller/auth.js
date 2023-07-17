const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.RegisterAuth = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const userOb = new User({
      ...req.body,
      password: hash,
    });
    const saveUser = await userOb.save();
    res.status(200).json(saveUser);
  } catch (error) {
    next(error);
  }
};
exports.Loginauth = async (req, res, next) => {
  try {
    const UserFouned = await User.findOne({ email: req.body.email });
    if (!UserFouned) {
      res.status(404).json("The user is not found !");
    }
    
    const Userpassword = bcrypt.compare(UserFouned.password, req.body.password);
    if (!Userpassword) {
      res.status(401).json("This password is incorrcted !");
    }
    const accessToken = jwt.sign(
      {
        id: UserFouned._id,
        isAdmin: UserFouned.isAdmin,
      },
      process.env.JWT_SEC
    );
    const { password, ...others } = UserFouned._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    next(error);
  }
};
