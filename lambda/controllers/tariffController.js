const tariffService = require("../services/tariffServices")
const { successResponse, errorResponse } = require("../utils/helper")

const getAllTariff = async (req, res) => {
    try {
        result = await tariffService.getAllTariff()

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const createTariff = async (req, res) => {
    try {
        result = await tariffService.createNewTariff(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const updateTariff = async (req, res) => {
    try {
        result = await tariffService.updateTariff(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const deleteTariff = async (req, res) => {
    try {
        result = await tariffService.deleteTariff(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports.getAllTariff = getAllTariff
module.exports.createTariff = createTariff
module.exports.updateTariff = updateTariff
module.exports.deleteTariff = deleteTariff