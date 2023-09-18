const tenantService = require("../services/tenantServices")

const constants = require("../utils/constants")
const { successResponse, errorResponse } = require("../utils/helper")

const getAllTenant = async (req, res) => {
    try {
        result = await tenantService.getAllTenant()

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const createTenant = async (req, res) => {
    try {
        result = await tenantService.createNewTenant(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}


const updateTenant = async (req, res) => {
    try {
        result = await tenantService.updateTenant(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const deleteTenant = async (req, res) => {
    try {
        result = await tenantService.deleteTenant(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports.getAllTenant = getAllTenant
module.exports.createTenant = createTenant
module.exports.updateTenant = updateTenant
module.exports.deleteTenant = deleteTenant