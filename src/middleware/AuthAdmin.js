// controllers/adminController.js
function Admin(req, res, next) {
  // Check if req.user exists and has the 'role' property
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "You do not have permission to access this page" });
  } else {
    next();
  }
}

module.exports = Admin;
