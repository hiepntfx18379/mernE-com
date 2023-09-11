const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [4, "Password should be greater than 4 characters"],
      select: false,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    avatar: {
      type: String,
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  { timestamps: true },
);

// hash password
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  user.password = await bcrypt.hash(user.password, 10);
  next();
});

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
