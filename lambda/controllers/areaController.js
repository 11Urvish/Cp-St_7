const areaServices = require("../services/areaServices")

const constants = require("../utils/constants")
const { successResponse, errorResponse } = require("../utils/helper")

const getAllArea = async (req, res) => {
    try {
        result = await areaServices.getAllArea()

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const createArea = async (req, res) => {
    try {
        const areaData = {
            name: req.body.name,
            code: req.body.code,
            cityCode: req.body.cityCode,
            stateCode: req.body.stateCode,
            countryCode: req.body.countryCode
        }

        code = constants.HTTP_SUCCESS_CODE
        success = true
        result = await areaServices.createNewArea(areaData)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const updateArea = async (req, res) => {
    try {
        result = await areaServices.updateArea(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const deleteArea = async (req, res) => {
    try {
        result = await areaServices.deleteArea(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports.getAllArea = getAllArea
module.exports.createArea = createArea
module.exports.updateArea = updateArea
module.exports.deleteArea = deleteArea