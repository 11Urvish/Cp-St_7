const chargeSpotServices = require("../services/chargeSpotServices")
const { successResponse, errorResponse } = require("../utils/helper")

const getAllChargeSpot = async (req, res) => {
    try {
        result = await chargeSpotServices.getAllChargeSpot()

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const createChargeSpot = async (req, res) => {
    try {
        result = await chargeSpotServices.createNewChargeSpot(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const updateChargeSpot = async (req, res) => {
    try {
        result = await chargeSpotServices.updateChargeSpot(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const deleteChargeSpot = async (req, res) => {
    try {
        result = await chargeSpotServices.deleteChargeSpot(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports.getAllChargeSpot = getAllChargeSpot
module.exports.createChargeSpot = createChargeSpot
module.exports.updateChargeSpot = updateChargeSpot
module.exports.deleteChargeSpot = deleteChargeSpot