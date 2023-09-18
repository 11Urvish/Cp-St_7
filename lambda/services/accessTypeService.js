const accessTypeModel = require("../models/accessTypeModel")
const { propogateError } = require("../utils/helper")

const getAllAccessType = async () => {
    try {
        return { data: await accessTypeModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }), message: "Access Type details!" }
    } catch (error) {
        propogateError(error.message || "Error in finding Access Type!")
    }
}


const createAccessType = async (StationAccessData) => {
    try {
        const accessType = new accessTypeModel(StationAccessData)
        const result = await accessType.save()
        return { data: result, message: "Access Type created successfully!" }
    } catch (error) {
        propogateError(error.message || "Error in creating Access Type!")
    }
}

const updateAccessType = async (StationAccessData) => {
    try {
        const accessType = await accessTypeModel.findById(StationAccessData.accessTypeId)

        if (!accessType) {
            propogateError("Access Type does not exist!")
        }

        accessType.name = StationAccessData.name || accessType.name;
        accessType.station = StationAccessData.station || accessType.station;
        accessType.access = StationAccessData.access || accessType.access;
        accessType.status = StationAccessData.status || accessType.status;

        return { data: await accessType.save(), message: "Access Type details updated!" }
    } catch (error) {
        propogateError(error.message || "Error in updating Access Type!")
    }
}
const deleteAccessType = async ({ deleteAll, accessTypeId }) => {

    try {

        if (deleteAll) {
            return { data: await accessTypeModel.deleteMany({}), message: "All Access Type Deleted!" }
        }

        const accessType = await accessTypeModel.findById(accessTypeId)

        if (!accessType) {
            propogateError("Access Type does not exist!")
        }

        return { data: await accessTypeModel.deleteOne({ _id: accessTypeId }), message: "Access Type Deleted!" }
    } catch (error) {
        propogateError(error.message || "Error in deleting Access Type!")
    }
}

module.exports.getAllAccessType = getAllAccessType
module.exports.createAccessType = createAccessType
module.exports.updateAccessType = updateAccessType
module.exports.deleteAccessType = deleteAccessType