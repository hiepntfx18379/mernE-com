const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const catchAsyncError = require("./catchAsyncError");

const authenticated = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Please login again" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  next();
});

const verifyAdmin = catchAsyncError(async (req, res, next) => {
  authenticated(req, res, next, () => {
    if (req.user.role === "admin") next();
    else next(new ErrorHandler("Youu are not authorized", 403));
  });
});

exports.authenticated = authenticated;
exports.verifyAdmin = verifyAdmin;
