const constants = require("../utils/constants")
const chargerServices = require('../services/chargerServices')
const { successResponse, errorResponse } = require("../utils/helper")

const getAllChargers = async (req, res) => {
    try {
        const stationId = req.query.stationId

        result = await chargerServices.getAllChargers(stationId)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const createCharger = async (req, res) => {
    try {
        result = await chargerServices.createCharger(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const updateCharger = async (req, res) => {
    try {
        result = await chargerServices.updateCharger(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const deleteCharger = async (req, res) => {
    try {
        result = await chargerServices.deleteCharger(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports.getAllChargers = getAllChargers
module.exports.createCharger = createCharger
module.exports.updateCharger = updateCharger
module.exports.deleteCharger = deleteCharger