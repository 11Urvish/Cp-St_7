const connectorTypeService = require("../services/connectorTypeService")
const { successResponse, errorResponse } = require("../utils/helper")

const getAllConnectorType = async (req, res) => {
    try {
        result = await connectorTypeService.getAllConnectorType()

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const createConnectorType = async (req, res) => {
    try {
        result = await connectorTypeService.createConnectorType(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const updateConnectorType = async (req, res) => {
    try {
        result = await connectorTypeService.updateConnectorType(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const deleteConnectorType = async (req, res) => {
    try {
        result = await connectorTypeService.deleteConnectorType(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports.getAllConnectorType = getAllConnectorType
module.exports.createConnectorType = createConnectorType
module.exports.updateConnectorType = updateConnectorType
module.exports.deleteConnectorType = deleteConnectorType