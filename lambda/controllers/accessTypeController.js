const accessTypeService = require("../services/accessTypeService")
const { successResponse, errorResponse } = require("../utils/helper")

const getAllAccessType = async (req, res) => {
    try {
        result = await accessTypeService.getAllAccessType()

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const createAccessType = async (req, res) => {
    try {
        result = await accessTypeService.createAccessType(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const updateAccessType = async (req, res) => {
    try {
        result = await accessTypeService.updateAccessType(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const deleteAccessType = async (req, res) => {
    try {
        result = await accessTypeService.deleteAccessType(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports.getAllAccessType = getAllAccessType
module.exports.createAccessType = createAccessType
module.exports.updateAccessType = updateAccessType
module.exports.deleteAccessType = deleteAccessType