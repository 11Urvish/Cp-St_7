const bookingServices = require("../services/bookingServices");

const constants = require("../utils/constants");
const { successResponse, errorResponse } = require("../utils/helper");

const createBooking = async (req, res) => {
  try {
    const params = { ...req.body, ...req.tokenData };

    code = constants.HTTP_SUCCESS_CODE;
    success = true;
    result = await bookingServices.createBooking(params);

    return successResponse(res, result.data, result.message);
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports.createBooking = createBooking;
