const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    id_user: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: { type: String, require: true },
    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    products: {
      type: [Object],
      require: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    delivery: {
      type: String,
      default: "Waiting for processing",
    },
    status: {
      type: String,
      default: "Waiting for pay",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
