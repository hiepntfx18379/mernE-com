const express = require("express");
const orderController = require("../../controller/order/order.controller");
const { verifyAdmin, authenticated } = require("../../middleware/auth");
const routeOrder = express.Router();

routeOrder.get("/", verifyAdmin, orderController.getAllOrder);
routeOrder.post("/verify", authenticated, orderController.verifyOrder);
routeOrder.get("/orderUser", authenticated, orderController.getOrderUser);

module.exports = routeOrder;
