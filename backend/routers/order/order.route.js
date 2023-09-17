const express = require("express");
const orderController = require("../../controller/order/order.controller");
const { authenticated, verifyAdmin } = require("../../middleware/auth");
const routeOrder = express.Router();

routeOrder.get("/", orderController.getAllOrder);
routeOrder.post("/verify", authenticated, orderController.verifyOrder);
routeOrder.get("/orderUser", authenticated, orderController.getOrderUser);

module.exports = routeOrder;
