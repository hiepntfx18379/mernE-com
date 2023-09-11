const express = require("express");
const userController = require("../../controller/user/user.controller");
const { authenticated } = require("../../middleware/auth");

const userRoute = express.Router({ mergeParams: true });

// user
userRoute.get("/", userController.getAllUser);
userRoute.post("/create-user", userController.register);
userRoute.post(
  "/activation/:activation_token",
  userController.activationAccount,
);
userRoute.post("/login", userController.login);
userRoute.post("/forgotPassword", userController.forgotPassword);
userRoute.patch(
  "/resetPassword/:activation_token",
  userController.resetPassword,
);
userRoute.get("/getUser", authenticated, userController.getUser);
userRoute.patch(
  "/changePassword",
  authenticated,
  userController.changePassword,
);
userRoute.patch("/updateInfo", authenticated, userController.updateInfo);
userRoute.get("/logout", authenticated, userController.logout);

module.exports = userRoute;
