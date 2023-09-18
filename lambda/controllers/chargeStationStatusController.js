const chargeStationStatusService = require("../services/chargeStationStatusServices");
const { successResponse, errorResponse } = require("../utils/helper");

const getAllChargeStation = async (req, res) => {
    try {
        result = await chargeStationStatusService.getAllChargeStationStatus();

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const createChargeStation = async (req, res) => {
    try {
        result = await chargeStationStatusService.createNewChargeStationStatus(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const updateChargeStation = async (req, res) => {
    try {
        result = await chargeStationStatusService.updateChargeStationStatus(req.body);

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const deleteChargeStation = async (req, res) => {
    try {
        result = await chargeStationStatusService.deleteChargeStationStatus(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports.getAllChargeStationStatus = getAllChargeStation
module.exports.createChargeStationStatus = createChargeStation
module.exports.updateChargeStationStatus = updateChargeStation
module.exports.deleteChargeStationStatus = deleteChargeStation