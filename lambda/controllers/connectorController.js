const constants = require("../utils/constants")
const connectorServices = require("../services/connectorServices")
const { successResponse, errorResponse } = require("../utils/helper")

const getAllConnectors = async (req, res) => {
    try {
        const chargerId = req.query.chargerId

        result = await connectorServices.getAllConnectors(chargerId)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const createConnector = async (req, res) => {
    try {
        result = await connectorServices.createConnector(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const updateConnector = async (req, res) => {
    try {
        result = await connectorServices.updateConnector(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const deleteConnector = async (req, res) => {
    try {
        result = await connectorServices.deleteConnector(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const startTransaction = async (req, res) => {
    try {
        const result = await connectorServices.startTransaction(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const stopTransaction = async (req, res) => {
    try {
        const result = await connectorServices.stopTransaction(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports.getAllConnectors = getAllConnectors
module.exports.createConnector = createConnector
module.exports.updateConnector = updateConnector
module.exports.deleteConnector = deleteConnector
module.exports.startTransaction = startTransaction
module.exports.stopTransaction = stopTransaction