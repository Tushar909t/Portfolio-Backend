const IntroModel = require("../model/IntroModel");

exports.IntroCreate = async (req, res) => {
  try {
    const PostBody = req.body;
    let data = await IntroModel.create(PostBody);
    return res.status(201).json({ status: "success", data: data });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ status: "fail", data: error.toString() });
  }
};
exports.IntroUpdate = async (req, res) => {
  try {
    let email = req.headers["email"];
    let id = req.params.id;
    const PostBody = req.body;
    let data = await IntroModel.findByIdAndUpdate(
      { email: email, _id: id },
      PostBody
    );
    return res.status(201).json({ status: "success", data: data });
  } catch (error) {
    return res.status(401).json({ status: "fail", data: error.toString() });
  }
};

exports.IntroFind = async (req, res) => {
  try {
    let data = await IntroModel.find({});
    return res.status(201).json({ status: "success", data: data });
  } catch (error) {
    return res.status(401).json({ status: "fail", data: error.toString() });
  }
};
