const constants = require("../utils/constants")
const logServices = require('../services/logServices')
const { successResponse, errorResponse } = require("../utils/helper")

const getAllLogs = async (req, res) => {
    try {
            result = await logServices.getAllLogs({})

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const getLogsById = async (req, res) => {
    try {
        result = await logServices.getLogsById(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports.getAllLogs = getAllLogs
module.exports.getLogsById = getLogsById