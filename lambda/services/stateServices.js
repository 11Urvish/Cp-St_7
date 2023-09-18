const stateModel = require("../models/stateModel")
const { propogateError } = require("../utils/helper")

const getAllState = async () => {
    try {
        return { data: await stateModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }), message: "State details!" }
    } catch (error) {
        propogateError(error.message || "Error in finding state details!")
    }
}

const createNewState = async (stateData) => {
    try {
        const city = new stateModel(stateData)

        return { data: await city.save(), message: "State created successfully" }
    } catch (error) {
        propogateError(error.message || "Error in creating state details!")
    }
}

const updateState = async (stateData) => {
    try {
        const state = await stateModel.findById(stateData.stateId)

        if (!state) {
            return { data: null, message: "state Does Not Exist" }
        }

        state.name = stateData.name || state.name;
        state.code = stateData.code || state.code;
        state.countryCode = stateData.countryCode || state.countryCode;
        state.status = stateData.status || state.status;

        return { data: await state.save(), message: "state details updated" }
    } catch (error) {
        propogateError(error.message || "Error in updating state details!")
    }
}

const deleteState = async ({ deleteAll, stateId }) => {
    try {
        if (deleteAll) {
            return { data: await stateModel.deleteMany({}), message: "All states deleted!" }
        }

        const state = await stateModel.findById(stateId)

        if (!state) {
            return { data: null, message: "state Does Not Exist" }
        }

        return { data: await stateModel.deleteOne({ _id: stateId }), message: "state Deleted" }

    } catch (error) {
        propogateError(error.message || "Error in deleting state details!")
    }
}

module.exports.getAllState = getAllState
module.exports.createNewState = createNewState
module.exports.updateState = updateState
module.exports.deleteState = deleteState