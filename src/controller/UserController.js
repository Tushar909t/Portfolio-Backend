const UserModel = require("../model/UserModel");
const OTPModel = require("../model/OTPModel");
const HashPassword = require("./../helper/AuthHelper");
const CreateToken = require("../utils/CreateToken");
const SendEmailVerify = require("../utils/SendEmailVerify");
const bcrypt = require("bcrypt");

exports.Regstrations = async (req, res) => {
  try {
    const { email, firstname, lastname, password, mobile, photo } = req.body;
    if (!email) {
      return res.send({ status: "fail", data: "Email is required" });
    } else if (!firstname) {
      return res.send({ status: "fail", data: "Firstname is required" });
    } else if (!lastname) {
      return res.send({ status: "fail", data: "Lastname is required" });
    } else if (!password) {
      return res.send({ status: "fail", data: "Password is required" });
    } else if (!mobile) {
      return res.send({ status: "fail", data: "Mobile is required" });
    } else {
      const exisitingsUser = await UserModel.findOne({ email });
      if (exisitingsUser) {
        return res.send({ status: "fail", data: "User alredy exists" });
      }
      // Hash Password
      const HashedPassword = await HashPassword(password);
      const PostBody = {
        email,
        firstname,
        lastname,
        password: HashedPassword,
        mobile,
        photo,
      };
      let data = await UserModel.create(PostBody);
      res.status(201).json({ status: "success", data: data });
    }
  } catch (error) {
    res.status(401).json({ status: "fail", data: error.toString() });
  }
};

exports.UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ status: "fail", data: "Email or Password is required" });
    }
    const User = await UserModel.findOne({ email: email });
    if (!User) {
      return res.status(402).json({ status: "fail", data: "User not found" });
    }
    const Match = await bcrypt.compare(password, User.password);
    if (!Match) {
      return res
        .status(400)
        .json({ status: "fail", data: "Password is incorrect" });
    } else {
      const token = await CreateToken({
        user: User.email,
        user: User.password,
        user: User.role,
      });
      return res
        .status(201)
        .json({ status: "success", token: token, data: User });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.UserUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const { email, firstname, lastname, password, mobile, photo } = req.body;
    const HashedPassword = await HashPassword(password);
    const PostBody = {
      email,
      firstname,
      lastname,
      password: HashedPassword,
      mobile,
      photo,
    };
    let data = await UserModel.findByIdAndUpdate(id, PostBody);
    return res.status(201).json({ status: "success", data: data });
  } catch (error) {
    console.log(error);
  }
};
exports.UserProfileDetails = async (req, res) => {
  try {
    let email = req.headers["email"];
    let User = await UserModel.aggregate([
      {
        $match: { email: email },
      },
      {
        $project: {
          _id: 1,
          email: 1,
          firstname: 1,
          lastname: 1,
          password: 1,
          mobile: 1,
          photo: 1,
        },
      },
    ]);
    return res.status(201).json({ status: "success", data: User });
  } catch (error) {
    return res.status(401).json({ status: "fail", data: error.toString() });
  }
};
