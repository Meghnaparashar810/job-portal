import User from "../models/usermodel.js";

export const  userprofile = async (req, res) => {
  try {

    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.log(error);
  }
};