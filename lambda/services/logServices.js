const logModel = require("../models/logModel")
const { propogateError } = require("../utils/helper")

const getAllLogs = async () => {
    try {
        return { data: await logModel.find({}, { updatedAt: 0, createdAt: 0, __v: 0 }), message: "Logs Found" }
    } catch (error) {
        propogateError(error.message || "Error in finding logs")
    }
}

const getLogsById = async ({ tenantId, clientId }) => {
    try {
        return { data: await logModel.find({ tenantId: tenantId, clientId: clientId }, { updatedAt: 0, createdAt: 0, __v: 0 }), message: "Logs Found" }
    } catch (error) {
        propogateError(error.message || "Error in finding logs")
    }
}

module.exports.getAllLogs = getAllLogs
module.exports.getLogsById = getLogsById