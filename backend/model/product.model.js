const mongose = require("mongoose");

const productSchema = new mongose.Schema(
  {
    idUser: {
      type: Object,
    },
    name: {
      type: String,
      required: [true, "Please enter your product name"],
    },
    long_desc: {
      type: String,
      required: [true, "Please enter your product description!"],
    },
    short_desc: {
      type: String,
      required: [true, "Please enter your product description!"],
    },
    category: {
      type: String,
      required: [true, "Please enter your product category!"],
    },
    price: {
      type: String,
      required: [true, "Please enter your product price!"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter your product stock!"],
    },
    photos: [Object],
  },
  { timestamps: true },
);

module.exports = mongose.model("Product", productSchema);
