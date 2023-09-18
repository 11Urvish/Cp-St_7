const paymentMethodServices = require("../services/paymentMethodServices");
const { successResponse, errorResponse } = require("../utils/helper");

const getAllPaymentMethod = async (req, res) => {
  try {
    result = await paymentMethodServices.getAllPaymentMethod();

    return successResponse(res, result.data, result.message);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const createPaymentMethod = async (req, res) => {
  try {
    console.log("req.body", req.body);
    console.log("req.tokenData", req.tokenData);

    const params = { ...req.body, ...req.tokenData };

    result = await paymentMethodServices.createNewPaymentMethod(params);

    console.log("result", result);

    // return res.send({ success: true, message: result.message, data: result.data });

    // return res.send({ success: true, data: { ...result }, message: "Inside createPaymentMethod" });

    const data = result.data;
    const message = result.message;

    return successResponse(res, data, message);
  } catch (error) {
    console.log("error", error);
    return errorResponse(res, error);
  }
};

const capturePayment = async (req, res) => {
  try {
    const params = { ...req.body, ...req.tokenData };

    result = await paymentMethodServices.capturePayment(params);

    return successResponse(res, result.data, result.message);
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports.getAllPaymentMethod = getAllPaymentMethod;
module.exports.createPaymentMethod = createPaymentMethod;
module.exports.capturePayment = capturePayment;
