const User = require("./../models/signUpModel");
const path = require("path");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve users",
    });
  }
};

exports.getAdminDashboard = async (req, res) => {
  try {
    // console.log(req.params.adminJWT);
    res.sendFile(path.join(__dirname, "../admin.html"));
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to load Admin Dashboard",
    });
  }
};
