const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");
const cartController = require("../controllers/admin");
router.get("/products", shopController.getProducts);
router.get("/cart", shopController.getCart);
router.get("/orders", shopController.getOrders);
router.get("/checkout", shopController.getCheckout);
router.get("/", shopController.getIndex);

module.exports = router;
