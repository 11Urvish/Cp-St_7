const jwt = require("jsonwebtoken")

const userModel = require("../models/userModel")
const { propogateError, generateId } = require("../utils/helper")

const getAllUsers = async () => {
    try {
        return { data: await userModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }), message: "User Details!" }
    } catch (error) {
        propogateError(error.message || "Error in finding user details!")
    }
}

const createNewUser = async (userData) => {
    try {
        const user = new userModel(userData)

        user.tenantId = "T" + generateId(12)

        user.password = await user.setPassword(userData.password)

        return { data: await user.save(), message: "New User Created!" }
    } catch (error) {
        propogateError(error.message || "Error while creating new user!");
    }
}

const updateUser = async (userData) => {
    try {
        const user = await userModel.findById(userData.userId)

        if (!user) {
            return { data: null, message: "User Does Not Exist" }
        }

        user.firstname = userData.firstname || user.firstname
        user.lastname = userData.lastname || user.lastname
        user.email = userData.email || user.email
        user.username = userData.username || user.username
        user.password = (userData.password) ? await user.setPassword(userData.password) : user.password
        user.role = userData.role || user.role
        user.stations = userData.stations || user.stations
        user.country = userData.country || user.country
        user.zipcode = userData.zipcode || user.zipcode
        user.status = userData.status || user.status

        return { data: await user.save(), message: "User Details Updated!" }
    } catch (error) {
        propogateError(error.message || "Error while updating user details!");
    }
}

const deleteUser = async ({ deleteAll, userId }) => {
    try {
        if (deleteAll) {
            return { data: await userModel.deleteMany({}), message: "All Users Deleted!" }
        }

        const user = await userModel.findById(userId)

        if (!user) {
            return { data: null, message: "User Does Not Exist!" }
        }

        return { data: await userModel.deleteOne({ _id: userId }), message: "User Deleted!" }
    } catch (error) {
        propogateError(error.message || "Error in deleting user!")
    }
}

const loginUser = async ({ email, password }) => {
    try {
        const user = await userModel.findOne({ email: email })

        if (!user) {
            propogateError("User does not exist!")
        }

        if (!await user.validatePassword(password)) {
            propogateError("Invalid Credentials!")
        }

        const userDetails = {
            token: user.setToken()
        }

        return { data: userDetails, message: "Login Success" }
    } catch (error) {
        propogateError(error.message || "Error in login")
    }
}

module.exports.getAllUsers = getAllUsers
module.exports.createNewUser = createNewUser
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser
module.exports.loginUser = loginUser