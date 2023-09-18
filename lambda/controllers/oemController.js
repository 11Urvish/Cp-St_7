const oemService = require("../services/oemServices")
const { successResponse, errorResponse } = require("../utils/helper")

const getAllOem = async (req, res) => {
    try {
        result = await oemService.getAllOem()

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const createOem = async (req, res) => {
    try {
        result = await oemService.createNewOem(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const updateOem = async (req, res) => {
    try {
        result = await oemService.updateOem(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const deleteOem = async (req, res) => {
    try {
        result = await oemService.deleteOem(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports.getAllOem = getAllOem
module.exports.createOem = createOem
module.exports.updateOem = updateOem
module.exports.deleteOem = deleteOem