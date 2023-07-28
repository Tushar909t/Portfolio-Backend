const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");

const AuthVerify = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(401).json({ status: "fail", data: "Token is invalid" });
    }
    const Users = await User.findOne({ decode: decode.user });
    if (!Users) {
      return res.status(401).json({ status: "fail", data: "User not found" });
    }
    if (Users.role !== "admin") {
      return res
        .status(402)
        .json({ status: "fail", data: "User is not on Admin" });
    }
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = AuthVerify;
