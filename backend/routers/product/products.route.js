const express = require("express");
const productController = require("../../controller/product/product.controller");
const routeProduct = express.Router();

routeProduct.post("/create-product", productController.createProduct);
routeProduct.get("/", productController.getAllProduct);
routeProduct.patch("/update/:id", productController.updateProduct);
routeProduct.delete("/delete/:id", productController.deleteProduct);
routeProduct.get("/:id", productController.findProduct);
routeProduct.patch("/updateQuantity/:id", productController.updateQuantity);

module.exports = routeProduct;
