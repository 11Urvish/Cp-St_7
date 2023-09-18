const chargingStationService = require("../services/chargingStationServices")

const constants = require("../utils/constants")
const { successResponse, errorResponse } = require("../utils/helper")

const getAllChargingStation = async (req, res) => {
    try {
        result = await chargingStationService.getAllChargingStation()

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const createChargingStation = async (req, res) => {
    try {
        result = await chargingStationService.createNewChargingStation(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}


const updateChargingStation = async (req, res) => {
    try {
        result = await chargingStationService.updateChargingStation(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const deleteChargingStation = async (req, res) => {
    try {
        result = await chargingStationService.deleteChargingStation(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports.getAllChargingStation = getAllChargingStation
module.exports.createChargingStation = createChargingStation
module.exports.updateChargingStation = updateChargingStation
module.exports.deleteChargingStation = deleteChargingStation