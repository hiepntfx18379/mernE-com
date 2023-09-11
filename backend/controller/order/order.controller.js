const ErrorHandler = require("../../utils/ErrorHandler");
const orderModel = require("../../model/order.model");
const userModel = require("../../model/user.model");
const sendEmail = require("../../utils/sendEmail");
const loadInfo = require("./order");

const verifyOrder = async (req, res, next) => {
  try {
    const {
      _id,
      name,
      email,
      phoneNumber,
      addresses,
      listOrder,
      cost,
      quantity,
    } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return next(new ErrorHandler("Email not found", 400));

    const list = listOrder.map((item) => {
      return {
        name: item.name,
        category: item.category,
        price: item.price,
        photos: item.photos,
        quantity: item.quantity,
      };
    });
    const info = {
      id_user: _id,
      name,
      email,
      phone: phoneNumber,
      address: addresses[0],
      products: list,
      totalPrice: cost,
    };

    const output = loadInfo(info);
    try {
      await sendEmail({
        email: email,
        subject: "Check your order",
        message: `Hello ${name}, Check your history order`,
        temp: output,
      });

      const newOrder = new orderModel(info);
      await newOrder.save();

      res.status(200).json({ newOrder });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// for dashboard admin page
const getAllOrder = async (req, res) => {
  const allOrder = await orderModel.find();
  res.status(200).json(allOrder);
};

const getOrderUser = async (req, res) => {
  try {
    const orderOfUser = await orderModel.find({ id_user: req.user.id });
    res.status(200).json({ success: true, orderOfUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllOrder, getOrderUser, verifyOrder };
