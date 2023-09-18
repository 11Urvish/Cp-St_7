const transactionServices = require("../services/transactionServices");

const { successResponse, errorResponse } = require("../utils/helper");

const getAllTransaction = async (req, res) => {
    try {
        result = await transactionServices.getAllTransaction()

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const createTransaction = async (req, res) => {
    try {
        result = await transactionServices.createNewTransaction(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports.getAllTransaction = getAllTransaction;
module.exports.createTransaction = createTransaction;
