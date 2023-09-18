const express = require("express");
const router = express.Router();

const paymentMethodController = require("../controllers/paymentMethodController");
const paymentMethodValidator = require("../validators/paymentMethodValidator");

router.get("/", paymentMethodController.getAllPaymentMethod);

router.post("/", paymentMethodController.createPaymentMethod);

router.post("/capturePayment", paymentMethodController.capturePayment);

module.exports = router;
