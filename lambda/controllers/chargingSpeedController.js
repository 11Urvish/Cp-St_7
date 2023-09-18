const chargingSpeedService = require("../services/chargingSpeedServices")
const { successResponse, errorResponse } = require("../utils/helper")

const getAllChargingSpeed = async (req, res) => {
    try {
        result = await chargingSpeedService.getAllChargingSpeed()

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const createChargingSpeed = async (req, res) => {
    try {
        result = await chargingSpeedService.createNewChargingSpeed(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const updateChargingSpeed = async (req, res) => {
    try {
        result = await chargingSpeedService.updateChargingSpeed(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const deleteChargingSpeed = async (req, res) => {
    try {
        result = await chargingSpeedService.deleteChargingSpeed(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports.getAllChargingSpeed = getAllChargingSpeed
module.exports.createChargingSpeed = createChargingSpeed
module.exports.updateChargingSpeed = updateChargingSpeed
module.exports.deleteChargingSpeed = deleteChargingSpeed