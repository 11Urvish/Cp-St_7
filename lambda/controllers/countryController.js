const countryService = require("../services/countryServices")

const constants = require("../utils/constants")
const { successResponse, errorResponse } = require("../utils/helper")

const getAllCountry = async (req, res) => {
    try {
        result = await countryService.getAllCountry()

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const createCountry = async (req, res) => {
    try {
        result = await countryService.createNewCountry(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const updateCountry = async (req, res) => {
    try {
        result = await countryService.updateCountry(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const deleteCountry = async (req, res) => {
    try {
        result = await countryService.deleteCountry(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports.getAllCountry = getAllCountry
module.exports.createCountry = createCountry
module.exports.updateCountry = updateCountry
module.exports.deleteCountry = deleteCountry