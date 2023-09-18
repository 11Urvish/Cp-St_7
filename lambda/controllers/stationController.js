const constants = require("../utils/constants")
const stationServices = require("../services/stationServices")
const { successResponse, errorResponse } = require("../utils/helper")

const getAllStations = async (req, res) => {
    try {
        result = await stationServices.getAllStations()

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const createStation = async (req, res) => {
    try {
        result = await stationServices.createStation(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const updateStation = async (req, res) => {
    try {
        result = await stationServices.updateStation(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const deleteStation = async (req, res) => {
    try {
        result = await stationServices.deleteStation(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports.getAllStations = getAllStations
module.exports.createStation = createStation
module.exports.updateStation = updateStation
module.exports.deleteStation = deleteStation