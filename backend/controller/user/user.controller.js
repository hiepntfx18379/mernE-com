const ErrorHandler = require("../../utils/ErrorHandler");
const userModel = require("../../model/user.model");
const sendEmail = require("../../utils/sendEmail");
const sendToken = require("../../utils/sendToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "1h",
  });
};

const register = async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;
    const userEmail = await userModel.findOne({ email });

    if (userEmail) return next(new ErrorHandler("User already exists", 400));

    const newUser = {
      name,
      email,
      password,
      avatar,
    };

    const activationToken = createActivationToken(newUser);
    const activationUrl = `http://localhost:3000/user/activation/${activationToken}`;

    try {
      await sendEmail({
        email: newUser.email,
        subject: "Activate your account",
        message: `Hello ${newUser.name}, please click on the link to active your account: ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `please check your email: - ${newUser.name} to active your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

const activationAccount = async (req, res, next) => {
  try {
    const { activation_token } = req.params;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (!newUser) {
      return;
    }

    const { name, email, password, avatar } = newUser;

    const user = new userModel({
      name,
      email,
      password,
      avatar,
    });

    await user.save();
    sendToken(user, 201, res, "Account actived");
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email or password not empty, please try again" });
    }

    const user = await userModel
      .findOne({ email })
      .select("name password email avatar");
    if (!user) {
      return res
        .status(400)
        .json({ message: "User isn't exist, please sign-up" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid)
      return res
        .status(400)
        .json({ message: "Email or password is wrong, please try again" });

    sendToken(user, 201, res, "Login successfully");
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getAllUser = async (req, res) => {
  const users = await userModel.find();
  res.status(200).json(users);
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) res.status(400).json({ message: "User doesn't exist" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(201).json({
      success: true,
      user: null,
      message: "Logout successfully",
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return next(new ErrorHandler("Email not found", 400));

    const userFound = {
      id: user._id,
      email: user.email,
    };

    const activationToken = createActivationToken(userFound); // new token
    const activationUrl = `http://localhost:3000/user/resetPassword/${activationToken}`;

    try {
      await sendEmail({
        email: userFound.email,
        subject: "Reset your password",
        message: `Hello ${userFound.email}, please click on the link to reset your password: ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `please check your email: - ${userFound.email} to reset your password`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { activation_token } = req.params;
    const emailUser = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET,
    );
    const newPass = req.body;
    newPass.password = await bcrypt.hash(newPass.password, 10);
    const user = await userModel.findByIdAndUpdate(emailUser.id, newPass);
    await user.save();
    sendToken(user, 201, res, "Reset password successfully");
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

const changePassword = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id).select("password id");
    if (!user) res.status(400).json({ message: "User doesn't exist" });
    let { oldPassword, newPassword } = req.body;

    const isPasswordValid = await user.comparePassword(oldPassword);

    if (isPasswordValid) {
      newPassword = await bcrypt.hash(newPassword, 10);
      user.password = newPassword;
      await user.save();
      res.status(200).json({ message: "Update password successfully" });
    } else {
      res.status(200).json({ message: "Old password is wrong" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateInfo = async (req, res) => {
  try {
    const { name, email, avatar, phoneNumber } = req.body;
    const user = await userModel.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatar,
      phoneNumber,
    });

    // await user.save();
    res.status(200).json({ message: "Update info successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  register,
  activationAccount,
  login,
  getUser,
  getAllUser,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  updateInfo,
};
