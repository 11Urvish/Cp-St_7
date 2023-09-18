const stateService = require("../services/stateServices")
const { errorResponse, successResponse } = require("../utils/helper")

const getAllState = async (req, res) => {
    try {
        result = await stateService.getAllState()

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const createState = async (req, res) => {
    try {
        result = await stateService.createNewState(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const updateState = async (req, res) => {
    try {
        result = await stateService.updateState(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const deleteState = async (req, res) => {
    try {
        result = await stateService.deleteState(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports.getAllState = getAllState
module.exports.createState = createState
module.exports.updateState = updateState
module.exports.deleteState = deleteState