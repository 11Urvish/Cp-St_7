const chargingStationLisingApiServices = require("../services/chargingStationLisingApiServices")

const constants = require("../utils/constants")

let code = null
let success = false
let result = {
    data: null,
    message: "Error Occured"
}

const getAllStationLising = async (req, res) => {
    try {
        code = constants.HTTP_SUCCESS_CODE
        success = true
        result = await chargingStationLisingApiServices.getAllChargingStationAccessType()
    } catch (error) {
        code = constants.HTTP_INVALID_CODE
        success = false
    }

    return sendResponse(res, code, success, result.data, result.message)
}

const createStationLising = async (req, res) => {
    try {
        const LisingData = {
            name: req.body.name,
            station: req.body.name,
            lising: req.body.name,

        }

        code = constants.HTTP_SUCCESS_CODE
        success = true
        result = await chargingStationLisingApiServices.createChargingStationAccessType(LisingData)
    } catch (error) {
        code = constants.HTTP_INVALID_CODE
        success = false
    }

    return sendResponse(res, code, success, result.data, result.message)
}

const updateStationLising = async (req, res) => {
    try {
        const LisingData = req.body

        code = constants.HTTP_SUCCESS_CODE
        success = true
        result = await chargingStationLisingApiServices.updateChargingStationAccessType(LisingData)
    } catch (error) {
        code = constants.HTTP_INVALID_CODE
        success = false
    }

    return sendResponse(res, code, success, result.data, result.message)
}

const deleteStationLising = async (req, res) => {
    try {
        const StationLisingId = req.body.StationLisingId

        code = constants.HTTP_SUCCESS_CODE
        success = true
        result = await chargingStationLisingApiServices.deleteChargingStationAccessType(StationLisingId)

    } catch (error) {
        code = constants.HTTP_INVALID_CODE
        success = false
    }

    return sendResponse(res, code, success, result.data, result.message)
}

const sendResponse = (res, code, success, data, message) => {
    return res.status(code).send({ success: success, data: data, message: message })
}

module.exports.getAllChargingStationAccessType = getAllStationLising
module.exports.createChargingStationAccessType = createStationLising
module.exports.deleteChargingStationAccessType = updateStationLising
module.exports.updateChargingStationAccessType = deleteStationLising