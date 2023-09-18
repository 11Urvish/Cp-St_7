const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");
const customerValidator = require("../validators/customerValidator");

router.post("/getAllCustomers", customerValidator.validatePostPaginationRequest, customerController.getAllCustomers)

router.post("/register", customerValidator.validatePostRegisterRequest, customerController.register);

router.post("/login", customerValidator.validatePostLoginRequest, customerController.login);

router.post("/getCustomerTransaction", customerValidator.validatePostCustomerTransactionRequest, customerController.getCustomerTransaction)

router.patch("/changePassword", customerValidator.validatePostChangePasswordRequest, customerController.changePassword);

router.post("/forgotPassword", customerValidator.validatePostForgotPasswordRequest, customerController.forgotPassword);

router.patch("/profileUpdate", customerValidator.validatePostProfileUpdateRequest, customerController.profileUpdate);

router.patch("/updateStatus", customerValidator.validatePostProfileUpdateRequest, customerController.updateStatus);


module.exports = router