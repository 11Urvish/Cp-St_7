const customerService = require('../services/customerServices')
const { successResponse, errorResponse } = require('../utils/helper')

const getAllCustomers = async (req, res) => {
    try {
        result = await customerService.getAllCustomers(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const getCustomerTransaction = async (req, res) => {
    try {
        result = await customerService.getCustomerTransaction(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const register = async (req, res) => {
    try {
        result = await customerService.register(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const login = async (req, res) => {
    try {
        result = await customerService.login(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const forgotPassword = async (req, res) => {
    try {
        result = await customerService.forgotPassword(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const profileUpdate = async (req, res) => {
    try {
        result = await customerService.profileUpdate(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}


const updateStatus = async (req, res) => {
    try {
        result = await customerService.updateStatus(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}


const changePassword = async (req, res) => {
    try {
        result = await customerService.changePassword(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}


module.exports.getAllCustomers = getAllCustomers;
module.exports.getCustomerTransaction = getCustomerTransaction;
module.exports.register = register;
module.exports.login = login;
module.exports.forgotPassword = forgotPassword;
module.exports.profileUpdate = profileUpdate;
module.exports.updateStatus = updateStatus;
module.exports.changePassword = changePassword;