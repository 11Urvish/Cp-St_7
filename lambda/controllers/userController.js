const userServices = require("../services/userServices")
const { successResponse, propogateError, errorResponse } = require("../utils/helper")

const getAllUsers = async (req, res) => {
    try {
        result = await userServices.getAllUsers()

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const createUser = async (req, res) => {
    try {
        result = await userServices.createNewUser(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }

}

const updateUser = async (req, res) => {
    try {
        result = await userServices.updateUser(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const deleteUser = async (req, res) => {
    try {
        result = await userServices.deleteUser(req.body)

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

const loginUser = async (req, res) => {
    try {
        result = await userServices.loginUser(req.body)

        if (result.data.length < 1) {
            return propogateError(res, result)
        }

        return successResponse(res, result.data, result.message)
    } catch (error) {
        return errorResponse(res, error)
    }
}

module.exports.getAllUsers = getAllUsers
module.exports.createUser = createUser
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser
module.exports.loginUser = loginUser