const oemVendorModel = require("../models/oemVendorModel")
const oemVendorServices = require("../services/oemVendorService")
const { successResponse, errorResponse } = require("../utils/helper")

const getAllOemVendors = async (req, res) => {
    try {
        result = await oemVendorServices.getAllOemVendors()

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}


const createOemVendor = async (req, res) => {
    try {
        result = await oemVendorServices.createOemVendor(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const updateOemVendor = async (req, res) => {
    try {
        result = await oemVendorServices.updateOemVendor(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const deleteOemVendor = async (req, res) => {
    try {
        result = await oemVendorServices.deleteOemVendor(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}


module.exports = {
    getAllOemVendors,
    createOemVendor,
    updateOemVendor,
    deleteOemVendor
}