const cityService = require("../services/cityServices")

const constants = require("../utils/constants")
const { successResponse, errorResponse } = require("../utils/helper")

const getAllCity = async (req, res) => {
    try {
        result = await cityService.getAllCity()

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const createCity = async (req, res) => {
    try {
        result = await cityService.createNewCity(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const updateCity = async (req, res) => {
    try {
        result = await cityService.updateCity(req.body)

        return successResponse(res, result.data, result.message)
    }
    catch (error) {
        return errorResponse(res, error)
    }
}

const deleteCity = async (req, res) => {
    try {
        result = await cityService.deleteCity(req.body)

        return successResponse(res, result.data, result.message)
    }
    catch (error) {
        return errorResponse(res, error)
    }

}


module.exports.getAllCity = getAllCity
module.exports.createCity = createCity
module.exports.updateCity = updateCity
module.exports.deleteCity = deleteCity